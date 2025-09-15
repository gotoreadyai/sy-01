// ================================
// path: src/pages/admin/users/list.tsx
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

export const UsersList = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable({
    resource: "users",
    sorters: { initial: [{ field: "created_at", order: "desc" }] },
  });

  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Użytkownicy" description="Konta i role" />
        <Button onClick={() => create("users")}>
          <Plus className="w-4 h-4 mr-2" /> Dodaj użytkownika
        </Button>
      </FlexBox>

      <FlexBox>
        <Input placeholder="Szukaj po e-mailu lub nazwie…" className="max-w-sm"
          onChange={(e) =>
            setFilters([
              { field: "email", operator: "contains", value: e.target.value },
            ])
          }
        />
      </FlexBox>

      <GridBox>
        {data?.data?.map((u: any) => (
          <Card key={u.id}>
            <CardHeader>
              <Lead title={u.full_name} description={u.email} variant="card" />
            </CardHeader>
            <CardContent>
              <FlexBox variant="start" className="gap-2">
                {u.role && <Badge variant="secondary">{u.role}</Badge>}
                {u.branch_id && <Badge variant="outline">oddział #{u.branch_id}</Badge>}
                {u.branch_name && <Badge variant="outline">{u.branch_name}</Badge>}
              </FlexBox>
            </CardContent>
            <CardFooter>
              <FlexBox variant="start" className="gap-2">
                <Button variant="outline" size="sm" onClick={() => show("users", u.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => edit("users", u.id)}>
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
        itemName="użytkownicy"
      />
    </SubPage>
  );
};
