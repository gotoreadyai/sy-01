// ================================
// path: src/pages/admin/branches/list.tsx
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

export const BranchesList = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable({
    resource: "branches",
    sorters: { initial: [{ field: "created_at", order: "desc" }] },
  });
  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Oddziały" description="Lista placówek" />
        <Button onClick={() => create("branches")}>
          <Plus className="w-4 h-4 mr-2" /> Dodaj oddział
        </Button>
      </FlexBox>

      <FlexBox>
        <Input placeholder="Szukaj po nazwie..." className="max-w-sm"
          onChange={(e) => setFilters([{ field: "name", operator: "contains", value: e.target.value }])}
        />
      </FlexBox>

      <GridBox>
        {data?.data?.map((b: any) => (
          <Card key={b.id}>
            <CardHeader>
              <Lead title={b.name} description={b.city || "—"} variant="card" />
            </CardHeader>
            <CardContent>
              <FlexBox variant="start" className="gap-2">
                <Badge variant="outline">ID #{b.id}</Badge>
                {b.is_archived && <Badge variant="destructive">archiwum</Badge>}
              </FlexBox>
            </CardContent>
            <CardFooter>
              <FlexBox variant="start" className="gap-2">
                <Button variant="outline" size="sm" onClick={() => show("branches", b.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => edit("branches", b.id)}>
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
        itemName="oddziały"
      />
    </SubPage>
  );
};
