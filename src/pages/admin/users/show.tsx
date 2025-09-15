// ================================
// path: src/pages/admin/users/show.tsx
// ================================
import { useShow, useNavigation, useTable } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";

/** Odwzorowanie widoku `users` */
type User = {
  id: string;            // uuid
  email: string;
  full_name?: string | null;
  phone?: string | null;
  created_at: string;
  updated_at: string;
  role?: string | null;  // rola domyślna (z lateral)
  branch_id?: number | null;
  branch_name?: string | null;
};

export const UsersShow = () => {
  const { queryResult } = useShow<User>({ resource: "users" });
  const { list, edit } = useNavigation();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data; // User | undefined

  // pobieramy role efektywne; jeśli `record` jeszcze nie ma, filtr będzie pusty, a hook po refetchu zadziała
  const rolesQuery = useTable({
    resource: "v_user_effective_roles",
    filters: {
      permanent: record
        ? [{ field: "user_id", operator: "eq", value: record.id }]
        : [],
    },
    pagination: { current: 1, pageSize: 100 },
  });

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  const roles = rolesQuery.tableQuery.data?.data ?? [];

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("users")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.full_name || record.email} description={record.email} />
        <Button variant="outline" onClick={() => edit("users", record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            {record.role && <Badge variant="secondary">domyślna: {record.role}</Badge>}
            {record.branch_name && <Badge variant="outline">{record.branch_name}</Badge>}
            {record.branch_id && <Badge variant="outline">oddział #{record.branch_id}</Badge>}
          </div>
          <Separator />
          <div className="text-sm space-y-1">
            {record.phone && <div><b>Telefon:</b> {record.phone}</div>}
            <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>
            <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader><CardTitle>Wszystkie role (widok v_user_effective_roles)</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {roles.length ? (
            roles.map((r: any) => (
              <Badge key={`${r.role}-${r.branch_id ?? "global"}`} variant={r.branch_id ? "secondary" : "outline"}>
                {r.role}{r.branch_id ? ` @#${r.branch_id}` : " (global)"}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">Brak</span>
          )}
        </CardContent>
      </Card>
    </SubPage>
  );
};
