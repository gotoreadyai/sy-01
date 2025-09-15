// ================================
// path: src/pages/admin/maintenances/list.tsx
// ================================
import React from "react";
import { useTable, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input, Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus, CalendarClock } from "lucide-react";
import { PaginationSwith } from "@/components/navigation";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { ASSET_KINDS, SERVICE_KINDS } from "./shared";
import { RES_LIST } from "./index";

export const MaintenancesList: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable({
    resource: RES_LIST,
    sorters: { initial: [{ field: "due_at", order: "asc" }] },
  });
  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  const onSearch = (value: string) => setFilters([{ field: "asset_label", operator: "contains", value }]);
  const onKind = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "service_kind");
      return value ? [...others, { field: "service_kind", operator: "eq", value }] : others;
    });
  const onAsset = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "asset_kind");
      return value ? [...others, { field: "asset_kind", operator: "eq", value }] : others;
    });

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Serwis / Utrzymanie" description="Terminy i historia" />
        <Button onClick={() => create(RES_LIST)}><Plus className="w-4 h-4 mr-2" /> Dodaj wpis</Button>
      </FlexBox>

      <FlexBox className="gap-3">
        <Input placeholder="Szukaj po zasobie…" className="max-w-sm" onChange={(e) => onSearch(e.target.value)} />
        <Select onValueChange={(v) => (v === "__clear__" ? onKind(undefined) : onKind(v))}>
          <SelectTrigger className="w-56"><SelectValue placeholder="Filtr: typ serwisu" /></SelectTrigger>
          <SelectContent>
            {SERVICE_KINDS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            <SelectItem value="__clear__">Wyczyść</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(v) => (v === "__clear__" ? onAsset(undefined) : onAsset(v))}>
          <SelectTrigger className="w-56"><SelectValue placeholder="Filtr: zasób" /></SelectTrigger>
          <SelectContent>
            {ASSET_KINDS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            <SelectItem value="__clear__">Wyczyść</SelectItem>
          </SelectContent>
        </Select>
      </FlexBox>

      <GridBox>
        {data?.data?.map((m: any) => (
          <Card key={m.service_id}>
            <CardHeader>
              <Lead title={`${m.asset_label}`} description={m.service_kind} variant="card" />
            </CardHeader>
            <CardContent>
              <FlexBox variant="start" className="gap-2">
                <Badge variant="outline">SID #{m.service_id}</Badge>
                <Badge variant="secondary">{m.asset_kind} #{m.asset_id}</Badge>
                {m.branch_id && <Badge variant="outline">oddział #{m.branch_id}</Badge>}
                {m.done_at ? (
                  <Badge variant="outline">zakończono {new Date(m.done_at).toLocaleDateString()}</Badge>
                ) : (
                  <Badge variant="destructive"><CalendarClock className="w-3 h-3 mr-1" /> termin: {m.due_at ? new Date(m.due_at).toLocaleDateString() : "—"}</Badge>
                )}
              </FlexBox>
            </CardContent>
            <CardFooter>
              <FlexBox variant="start" className="gap-2">
                <Button variant="outline" size="sm" onClick={() => show(RES_LIST, m.service_id)}><Eye className="w-4 h-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => edit(RES_LIST, m.service_id)}><Edit className="w-4 h-4" /></Button>
              </FlexBox>
            </CardFooter>
          </Card>
        ))}
      </GridBox>

      <PaginationSwith current={current} pageSize={pageSize} total={data?.total || 0} setCurrent={setCurrent} itemName="wpisy" />
    </SubPage>
  );
};

export default MaintenancesList;
