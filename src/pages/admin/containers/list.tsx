// ================================
// path: src/pages/admin/containers/list.tsx
// ================================
import { useTable, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus } from "lucide-react";
import { useLoading } from "@/utility";
import { PaginationSwith } from "@/components/navigation";
import { SubPage } from "@/components/layout";
import React from "react";

const STATUSES = ["na_placu", "u_klienta", "na_pojezdzie", "serwis", "inne"] as const;

export const ContainersList: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable({
    resource: "containers",
    sorters: { initial: [{ field: "created_at", order: "desc" }] },
  });
  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  const onSearch = (value: string) =>
    setFilters((prev) => [
      ...(prev || []).filter((f: any) => f.field !== "code"),
      { field: "code", operator: "contains", value },
    ]);

  const onStatus = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "status");
      return value ? [...others, { field: "status", operator: "eq", value }] : others;
    });

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Kontenery" description="Ewidencja i statusy" />
        <Button onClick={() => create("containers")}>
          <Plus className="w-4 h-4 mr-2" /> Dodaj kontener
        </Button>
      </FlexBox>

      <FlexBox className="gap-3">
        <Input placeholder="Szukaj po kodzie..." className="max-w-sm" onChange={(e) => onSearch(e.target.value)} />
        <Select onValueChange={(v) => (v === "__clear__" ? onStatus(undefined) : onStatus(v))}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filtr: status (opcjonalnie)" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            <SelectItem value="__clear__">Wyczyść filtr</SelectItem>
          </SelectContent>
        </Select>
      </FlexBox>

      <GridBox>
        {data?.data?.map((c: any) => (
          <Card key={c.id}>
            <CardHeader>
              <Lead title={c.code} description={c.category || "—"} variant="card" />
            </CardHeader>
            <CardContent>
              <FlexBox variant="start" className="gap-2">
                <Badge variant="outline">ID #{c.id}</Badge>
                {c.status && <Badge variant="secondary">{c.status}</Badge>}
                {typeof c.tara_kg === "number" && <Badge variant="outline">{c.tara_kg} kg tara</Badge>}
                {c.branch_id && <Badge variant="outline">oddział #{c.branch_id}</Badge>}
                {c.is_archived && <Badge variant="destructive">archiwum</Badge>}
              </FlexBox>
            </CardContent>
            <CardFooter>
              <FlexBox variant="start" className="gap-2">
                <Button variant="outline" size="sm" onClick={() => show("containers", c.id)}><Eye className="w-4 h-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => edit("containers", c.id)}><Edit className="w-4 h-4" /></Button>
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
        itemName="kontenery"
      />
    </SubPage>
  );
};
