// ================================
// path: src/pages/admin/tasks/list.tsx
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

export const TasksList = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current,
    setCurrent,
    pageSize,
    setFilters,
  } = useTable({
    resource: "tasks",
    sorters: { initial: [{ field: "start_at", order: "desc" }] },
  });
  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Zadania" description="Lista zadań (kalendarz/plan)" />
        <Button onClick={() => create("tasks")}>
          <Plus className="w-4 h-4 mr-2" />
          Dodaj zadanie
        </Button>
      </FlexBox>

      <FlexBox>
        <Input
          placeholder="Szukaj po tytule..."
          className="max-w-sm"
          onChange={(e) =>
            setFilters([{ field: "title", operator: "contains", value: e.target.value }])
          }
        />
      </FlexBox>

      <GridBox>
        {data?.data?.map((t: any) => (
          <Card key={t.id}>
            <CardHeader>
              <Lead
                title={t.title}
                description={`Oddział #${t.branch_id} • ${new Date(t.start_at).toLocaleString()}`}
                variant="card"
              />
            </CardHeader>
            <CardContent>
              <FlexBox variant="start" className="gap-2">
                <Badge variant="secondary">{t.type}</Badge>
                <Badge variant="outline">{t.status}</Badge>
                {t.assigned_vehicle_id && (
                  <Badge variant="outline" className="text-xs">
                    pojazd #{t.assigned_vehicle_id}
                  </Badge>
                )}
                {t.assigned_container_id && (
                  <Badge variant="outline" className="text-xs">
                    kontener #{t.assigned_container_id}
                  </Badge>
                )}
              </FlexBox>
            </CardContent>
            <CardFooter>
              <FlexBox variant="start" className="gap-2">
                <Button variant="outline" size="sm" onClick={() => show("tasks", t.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => edit("tasks", t.id)}>
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
        itemName="zadania"
      />
    </SubPage>
  );
};
