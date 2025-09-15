// ================================
// path: src/pages/admin/maintenances/show.tsx
// ================================
import React from "react";
import { useShow, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { RES } from "./index";

type M = {
  id: number;
  title: string;
  type: string;
  branch_id?: number | null;
  asset_type: "vehicle" | "container" | "equipment";
  asset_id: number;
  due_at?: string | null;
  completed_at?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
};

export const MaintenancesShow = () => {
  const { queryResult } = useShow<M>({ resource: RES });
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
        <Lead title={record.title} description={`ID: #${record.id}`} />
        <Button variant="outline" onClick={() => edit(RES, record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Badge variant="secondary">{record.type}</Badge>
            <Badge variant="outline">{record.asset_type} #{record.asset_id}</Badge>
            {record.branch_id && <Badge variant="outline">oddział #{record.branch_id}</Badge>}
            {record.completed_at ? <Badge variant="outline">wykonano</Badge> : <Badge variant="destructive">do: {record.due_at ? new Date(record.due_at).toLocaleDateString() : "—"}</Badge>}
          </div>
          <Separator />
          <div className="text-sm space-y-1">
            {record.notes && <div><b>Notatki:</b> {record.notes}</div>}
            {record.created_at && <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>}
            {record.updated_at && <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>}
          </div>
        </CardContent>
      </Card>
    </SubPage>
  );
};

export default MaintenancesShow;
