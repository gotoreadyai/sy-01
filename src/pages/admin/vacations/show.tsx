// ================================
// path: src/pages/admin/vacations/show.tsx
// ================================
import { useShow, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { RES } from "./index";

type Vacation = {
  id: number;
  user_id: string;
  user_email?: string | null;
  branch_id?: number | null;
  start_date: string;
  end_date: string;
  status: string;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
};

export const VacationsShow = () => {
  const { queryResult } = useShow<Vacation>({ resource: RES });
  const { list, edit } = useNavigation();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list(RES)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.user_email || record.user_id} description={`ID: #${record.id}`} />
        <Button variant="outline" onClick={() => edit(RES, record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Badge variant={record.status === "zaakceptowany" ? "secondary" : record.status === "odrzucony" ? "destructive" : "outline"}>{record.status}</Badge>
            {record.branch_id && <Badge variant="outline">oddział #{record.branch_id}</Badge>}
          </div>
          <Separator />
          <div className="text-sm space-y-1">
            <div><b>Okres:</b> {record.start_date} → {record.end_date}</div>
            {record.notes && <div><b>Uwagi:</b> {record.notes}</div>}
            {record.created_at && <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>}
            {record.updated_at && <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>}
          </div>
        </CardContent>
      </Card>
    </SubPage>
  );
};
