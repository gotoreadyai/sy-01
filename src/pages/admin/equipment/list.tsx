// ================================
// path: src/pages/admin/equipment/list.tsx
// ================================
import React from "react";
import { useTable, useNavigation } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus, Wrench } from "lucide-react";
import { PaginationSwith } from "@/components/navigation";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";

export const EquipmentList: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable({
    resource: "yard_equipment",
    sorters: { initial: [{ field: "created_at", order: "desc" }] },
  });

  const { create, edit, show } = useNavigation();
  const navigate = useNavigate();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  const onSearch = (value: string) =>
    setFilters((prev: any[] = []) => {
      const others = prev.filter((f) => f.field !== "name");
      return [...others, { field: "name", operator: "contains", value }];
    });

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Sprzęt placowy" description="Maszyny / urządzenia na placu" />
        <Button onClick={() => create("yard_equipment")}>
          <Plus className="w-4 h-4 mr-2" /> Dodaj sprzęt
        </Button>
      </FlexBox>

      <FlexBox className="gap-3">
        <Input placeholder="Szukaj po nazwie…" className="max-w-sm" onChange={(e) => onSearch(e.target.value)} />
      </FlexBox>

      <GridBox>
        {data?.data?.map((e: any) => (
          <Card key={e.id}>
            <CardHeader>
              <Lead title={e.name} description="—" variant="card" />
            </CardHeader>
            <CardContent>
              <FlexBox variant="start" className="gap-2">
                <Badge variant="outline">ID #{e.id}</Badge>
                {e.type && <Badge variant="secondary">{e.type}</Badge>}
                {e.branch_id && <Badge variant="outline">oddział #{e.branch_id}</Badge>}
                {e.is_archived ? <Badge variant="destructive">archiwum</Badge> : <Badge variant="outline">dostępny</Badge>}
              </FlexBox>
            </CardContent>
            <CardFooter>
              <FlexBox variant="start" className="gap-2">
                <Button variant="outline" size="sm" onClick={() => show("yard_equipment", e.id)}><Eye className="w-4 h-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => edit("yard_equipment", e.id)}><Edit className="w-4 h-4" /></Button>
                {e.asset_id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/maintenances/create?asset_id=${e.asset_id}&kind=usterka`)}
                  >
                    <Wrench className="w-4 h-4 mr-1" /> Zgłoś usterkę
                  </Button>
                )}
              </FlexBox>
            </CardFooter>
          </Card>
        ))}
      </GridBox>

      <PaginationSwith current={current} pageSize={pageSize} total={data?.total || 0} setCurrent={setCurrent} itemName="pozycje" />
    </SubPage>
  );
};
