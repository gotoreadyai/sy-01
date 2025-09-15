// ================================
// path: src/pages/admin/hauls/show.tsx
// ================================
import { useShow, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";

const HAULS_TABLE = "dispatches";

type Haul = {
  id: number;
  title: string;
  status: string;
  branch_id: number;
  start_at: string;
  end_at?: string | null;
  driver_id?: string | null;
  vehicle_id?: number | null;
  trailer_id?: number | null;
  external_transport_client_id?: number | null;
  freight_rate?: number | null;
  freight_currency?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
};

export const HaulsShow = () => {
  const { queryResult } = useShow<Haul>({ resource: "dispatches", meta: { table: HAULS_TABLE } });
  const { list, edit } = useNavigation();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("dispatches")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.title} description={`ID: #${record.id}`} />
        <Button variant="outline" onClick={() => edit("dispatches", record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Badge variant="secondary">{record.status}</Badge>
            <Badge variant="outline">oddział #{record.branch_id}</Badge>
            {record.vehicle_id && <Badge variant="outline">pojazd #{record.vehicle_id}</Badge>}
            {record.trailer_id && <Badge variant="outline">naczepa #{record.trailer_id}</Badge>}
            {record.external_transport_client_id && <Badge variant="outline">zewn. transp. #{record.external_transport_client_id}</Badge>}
          </div>
          <Separator />
          <div className="text-sm space-y-1">
            <div><b>Start:</b> {new Date(record.start_at).toLocaleString()}</div>
            {record.end_at && <div><b>Koniec:</b> {new Date(record.end_at).toLocaleString()}</div>}
            {record.driver_id && <div><b>Kierowca (UUID):</b> {record.driver_id}</div>}
            {typeof record.freight_rate === "number" && <div><b>Stawka frachtu:</b> {record.freight_rate.toFixed(2)} {record.freight_currency || "PLN"}</div>}
            {record.notes && <div><b>Notatki:</b> {record.notes}</div>}
            {record.created_at && <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>}
            {record.updated_at && <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>}
          </div>
        </CardContent>
      </Card>
    </SubPage>
  );
};
