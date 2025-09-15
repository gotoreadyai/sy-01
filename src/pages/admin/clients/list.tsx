// ================================
// path: src/pages/admin/clients/list.tsx
// ================================
import { useTable, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus } from "lucide-react";
import { PaginationSwith } from "@/components/navigation";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";
import React from "react";

const SECTIONS = ["zakupy", "sprzedaz", "firmy_transportowe", "inne"];
const CLEAR_VALUE = "__clear__";

export const ClientsList: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable({
    resource: "clients",
    sorters: { initial: [{ field: "created_at", order: "desc" }] },
  });
  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  const onSearch = (value: string) =>
    setFilters((prev) => [
      ...(prev || []).filter((f: any) => f.field !== "name"),
      { field: "name", operator: "contains", value },
    ]);

  const onSection = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "section");
      return value ? [...others, { field: "section", operator: "eq", value }] : others;
    });

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Klienci" description="Baza klientów" />
        <Button onClick={() => create("clients")}>
          <Plus className="w-4 h-4 mr-2" /> Dodaj klienta
        </Button>
      </FlexBox>

      <FlexBox className="gap-3">
        <Input
          placeholder="Szukaj po nazwie..."
          className="max-w-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Select onValueChange={(v) => (v === CLEAR_VALUE ? onSection(undefined) : onSection(v))}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filtr: sekcja (opcjonalnie)" />
          </SelectTrigger>
          <SelectContent>
            {SECTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            <SelectItem value={CLEAR_VALUE}>Wyczyść filtr</SelectItem>
          </SelectContent>
        </Select>
      </FlexBox>

      <GridBox>
        {data?.data?.map((c: any) => (
          <Card key={c.id}>
            <CardHeader>
              <Lead title={c.name} description={c.email || c.phone || c.website || "—"} variant="card" />
            </CardHeader>
            <CardContent>
              <FlexBox variant="start" className="gap-2">
                <Badge variant="outline">ID #{c.id}</Badge>
                {c.section && <Badge variant="secondary">{c.section}</Badge>}
                {c.category && <Badge variant="outline">{c.category}</Badge>}
                {c.branch_id && <Badge variant="outline">oddział #{c.branch_id}</Badge>}
                {c.is_archived && <Badge variant="destructive">archiwum</Badge>}
              </FlexBox>
            </CardContent>
            <CardFooter>
              <FlexBox variant="start" className="gap-2">
                <Button variant="outline" size="sm" onClick={() => show("clients", c.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => edit("clients", c.id)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </FlexBox>
            </CardFooter>
          </Card>
        ))}
      </GridBox>

      <PaginationSwith
        current={current}
        pageSize={pageSize}
        total={data?.total || 0}
        setCurrent={setCurrent}
        itemName="klienci"
      />
    </SubPage>
  );
};
