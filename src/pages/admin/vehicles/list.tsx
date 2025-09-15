// ================================
// path: src/pages/vehicles/list.tsx
// ================================
import { useTable, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus } from "lucide-react";
import { useLoading } from "@/utility";
import { PaginationSwith } from "@/components/navigation";
import { SubPage } from "@/components/layout";

export const VehiclesList = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable({
    resource: "vehicles",
    sorters: { initial: [{ field: "created_at", order: "desc" }] },
  });
  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Flota" description="Pojazdy w systemie" />
        <Button onClick={() => create("vehicles")}>
          <Plus className="w-4 h-4 mr-2" /> Dodaj pojazd
        </Button>
      </FlexBox>

      <FlexBox>
        <Input placeholder="Szukaj po nazwie..." className="max-w-sm"
          onChange={(e) => setFilters([{ field: "name", operator: "contains", value: e.target.value }])}
        />
      </FlexBox>

      <GridBox>
        {data?.data?.map((v: any) => (
          <Card key={v.id}>
            <CardHeader>
              <Lead title={v.name} description={`Oddział #${v.branch_id}`} variant="card" />
            </CardHeader>
            <CardContent>
              <FlexBox variant="start" className="gap-2">
                <Badge variant="secondary">{v.type}</Badge>
                {v.reg_plate && <Badge variant="outline">{v.reg_plate}</Badge>}
                {v.is_archived && <Badge variant="destructive">archiwum</Badge>}
              </FlexBox>
            </CardContent>
            <CardFooter>
              <FlexBox variant="start" className="gap-2">
                <Button variant="outline" size="sm" onClick={() => show("vehicles", v.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => edit("vehicles", v.id)}>
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
        itemName="pojazdy"
      />
    </SubPage>
  );
};
