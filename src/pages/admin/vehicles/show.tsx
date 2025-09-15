// ================================
// path: src/pages/admin/vehicles/show.tsx
// ================================
import { useShow, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";

type Vehicle = {
  id: number;
  name: string;
  branch_id: number;
  type: "ciezarowe" | "osobowe" | "przyczepa" | "naczepa";
  reg_plate?: string | null;
  vin?: string | null;
  is_archived?: boolean;
};

export const VehiclesShow = () => {
  const { queryResult } = useShow<Vehicle>({ resource: "vehicles" });
  const { list, edit } = useNavigation();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("vehicles")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.name} description={`ID: #${record.id}`} />
        <Button variant="outline" onClick={() => edit("vehicles", record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Badge variant="secondary">{record.type}</Badge>
            {record.reg_plate && <Badge variant="outline">{record.reg_plate}</Badge>}
            {record.is_archived && <Badge variant="destructive">archiwum</Badge>}
          </div>
          <Separator />
          <div className="text-sm">
            <div><b>Oddział:</b> {record.branch_id}</div>
            {record.vin && <div><b>VIN:</b> {record.vin}</div>}
          </div>
        </CardContent>
      </Card>
    </SubPage>
  );
};
