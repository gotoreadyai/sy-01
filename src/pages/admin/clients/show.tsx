// ================================
// path: src/pages/admin/clients/show.tsx
// ================================
import { useShow, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";

type Client = {
  id: number;
  section: string;
  category?: string | null;
  name: string;
  description?: string | null;
  branch_id?: number | null;
  account_owner?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  is_archived?: boolean;
  created_at: string;
  updated_at: string;
};

export const ClientsShow = () => {
  const { queryResult } = useShow<Client>({ resource: "clients" });
  const { list, edit } = useNavigation();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("clients")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.name} description={`ID: #${record.id}`} />
        <Button variant="outline" onClick={() => edit("clients", record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            {record.section && <Badge variant="secondary">{record.section}</Badge>}
            {record.category && <Badge variant="outline">{record.category}</Badge>}
            {record.branch_id && <Badge variant="outline">oddział #{record.branch_id}</Badge>}
            {record.is_archived && <Badge variant="destructive">archiwum</Badge>}
          </div>
          <Separator />
          <div className="text-sm space-y-1">
            {record.phone && <div><b>Telefon:</b> {record.phone}</div>}
            {record.email && <div><b>Email:</b> {record.email}</div>}
            {record.website && <div><b>WWW:</b> {record.website}</div>}
            {record.description && <div><b>Opis:</b> {record.description}</div>}
            {record.account_owner && <div><b>Opiekun (UUID):</b> {record.account_owner}</div>}
            <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>
            <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
    </SubPage>
  );
};
