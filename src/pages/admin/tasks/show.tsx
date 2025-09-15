// ================================
// path: src/pages/admin/tasks/show.tsx
// ================================
import { useShow, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";

type Task = {
  id: string | number;
  title: string;
  type: string;
  status: string;
  branch_id: number;
  start_at: string;
  end_at?: string | null;
  assigned_driver?: string | null;
  assigned_vehicle_id?: number | null;
  assigned_container_id?: number | null;
};

export const TasksShow = () => {
  const { queryResult } = useShow<Task>({ resource: "tasks" });
  const { list, edit } = useNavigation();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data; // Task | undefined

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null; // ✅ zawężenie typu – brak ostrzeżenia

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("tasks")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.title} description={`ID: #${String(record.id).slice(0, 8)}`} />
        <Button variant="outline" onClick={() => edit("tasks", record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader>
          <CardTitle>Szczegóły</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Badge variant="secondary">{record.type}</Badge>
            <Badge variant="outline">{record.status}</Badge>
          </div>
          <Separator />
          <div className="text-sm">
            <div>
              <b>Oddział:</b> {record.branch_id}
            </div>
            <div>
              <b>Start:</b> {new Date(record.start_at).toLocaleString()}
            </div>
            {record.end_at && (
              <div>
                <b>Koniec:</b> {new Date(record.end_at).toLocaleString()}
              </div>
            )}
            {record.assigned_driver && (
              <div>
                <b>Kierowca (UUID):</b> {record.assigned_driver}
              </div>
            )}
            {record.assigned_vehicle_id && (
              <div>
                <b>Pojazd:</b> #{record.assigned_vehicle_id}
              </div>
            )}
            {record.assigned_container_id && (
              <div>
                <b>Kontener:</b> #{record.assigned_container_id}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </SubPage>
  );
};
