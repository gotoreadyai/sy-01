// ================================
// path: src/pages/admin/containers/show.tsx
// ================================
import { useShow, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";

type Container = {
  id: number;
  code: string;
  category?: string | null;
  branch_id: number;
  tare_kg?: number | null;
  status?: string | null;
  service_notes?: string | null;
  is_archived?: boolean;
  created_at?: string;
  updated_at?: string;
};

export const ContainersShow = () => {
  const { queryResult } = useShow<Container>({ resource: "containers" });
  const { list, edit } = useNavigation();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("containers")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.code} description={`ID: #${record.id}`} />
        <Button variant="outline" onClick={() => edit("containers", record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            {record.category && <Badge variant="outline">{record.category}</Badge>}
            {record.status && <Badge variant="secondary">{record.status}</Badge>}
            {typeof record.tare_kg === "number" && <Badge variant="outline">{record.tare_kg} kg</Badge>}
            {record.is_archived && <Badge variant="destructive">archiwum</Badge>}
          </div>
          <Separator />
          <div className="text-sm space-y-1">
            <div><b>Oddział:</b> {record.branch_id}</div>
            {record.service_notes && <div><b>Serwis:</b> {record.service_notes}</div>}
            {record.created_at && <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>}
            {record.updated_at && <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>}
          </div>
        </CardContent>
      </Card>
    </SubPage>
  );
};
