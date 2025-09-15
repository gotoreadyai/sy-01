// ================================
// path: src/pages/admin/vacations/list.tsx
// ================================
import React from "react";
import { useTable, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input, Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus } from "lucide-react";
import { PaginationSwith } from "@/components/navigation";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { RES } from "./index";

const STATUSES = ["zgloszony", "zaakceptowany", "odrzucony"] as const;

export const VacationsList: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable({
    resource: RES,
    sorters: { initial: [{ field: "start_date", order: "desc" }] },
  });
  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  const onSearch = (value: string) => setFilters([{ field: "user_email", operator: "contains", value }]);
  const onStatus = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "status");
      return value ? [...others, { field: "status", operator: "eq", value }] : others;
    });

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Urlopy" description="Wnioski urlopowe użytkowników" />
        <Button onClick={() => create(RES)}><Plus className="w-4 h-4 mr-2" /> Nowy wniosek</Button>
      </FlexBox>

      <FlexBox className="gap-3">
        <Input placeholder="Szukaj po e-mailu…" className="max-w-sm" onChange={(e) => onSearch(e.target.value)} />
        <Select onValueChange={(v) => (v === "__clear__" ? onStatus(undefined) : onStatus(v))}>
          <SelectTrigger className="w-56"><SelectValue placeholder="Filtr: status" /></SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            <SelectItem value="__clear__">Wyczyść filtr</SelectItem>
          </SelectContent>
        </Select>
      </FlexBox>

      <GridBox>
        {data?.data?.map((v: any) => (
          <Card key={v.id}>
            <CardHeader>
              <Lead title={v.user_email || v.user_id} description={`${v.start_date} → ${v.end_date}`} variant="card" />
            </CardHeader>
            <CardContent>
              <FlexBox variant="start" className="gap-2">
                <Badge variant="outline">ID #{v.id}</Badge>
                <Badge variant={v.status === "zaakceptowany" ? "secondary" : v.status === "odrzucony" ? "destructive" : "outline"}>
                  {v.status}
                </Badge>
                {v.branch_id && <Badge variant="outline">oddział #{v.branch_id}</Badge>}
              </FlexBox>
            </CardContent>
            <CardFooter>
              <FlexBox variant="start" className="gap-2">
                <Button variant="outline" size="sm" onClick={() => show(RES, v.id)}><Eye className="w-4 h-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => edit(RES, v.id)}><Edit className="w-4 h-4" /></Button>
              </FlexBox>
            </CardFooter>
          </Card>
        ))}
      </GridBox>

      <PaginationSwith current={current} pageSize={pageSize} total={data?.total || 0} setCurrent={setCurrent} itemName="wnioski" />
    </SubPage>
  );
};
