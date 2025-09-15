
// ================================
// path: src/pages/admin/pricelists/list.tsx
// ================================
import { useTable, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus } from "lucide-react";
import { PaginationSwith } from "@/components/navigation";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";

export const PricelistsList = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current,
    setCurrent,
    pageSize,
    setFilters,
  } = useTable({
    resource: "price_lists",
    sorters: { initial: [{ field: "created_at", order: "desc" }] },
  });
  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Cenniki" description="Wersje cenników" />
        <Button onClick={() => create("price_lists")}>
          <Plus className="w-4 h-4 mr-2" /> Nowa wersja
        </Button>
      </FlexBox>

      <FlexBox>
        <Input
          placeholder="Szukaj po nazwie..."
          className="max-w-sm"
          onChange={(e) =>
            setFilters([{ field: "title", operator: "contains", value: e.target.value }])
          }
        />
      </FlexBox>

      <GridBox>
        {data?.data?.map((p: any) => (
          <Card key={p.id}>
            <CardHeader>
              <Lead title={p.title} description={p.version_tag || "—"} variant="card" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Badge variant="outline">ID #{p.id}</Badge>
                {p.branch_id && <Badge variant="outline">oddział #{p.branch_id}</Badge>}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => show("price_lists", p.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => edit("price_lists", p.id)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </GridBox>

      <PaginationSwith
        current={current}
        pageSize={pageSize}
        total={data?.total || 0}
        setCurrent={setCurrent}
        itemName="cenniki"
      />
    </SubPage>
  );
};
