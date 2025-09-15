// ================================
// path: src/pages/admin/containers/show.tsx
// ================================
import { useShow, useNavigation, useList } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit, Plus, Wrench, CheckCircle } from "lucide-react";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";
import { useNavigate } from "react-router-dom";

type Container = {
  id: number;
  asset_id: number;
  code: string;
  category?: string | null;
  branch_id: number;
  tara_kg?: number | null;
  status?: string | null;
  is_archived?: boolean;
  created_at?: string;
  updated_at?: string;
};

// źródło danych dla książki serwisowej (VIEW)
const MAINT_RES = "asset_maintenances" as const;

export const ContainersShow = () => {
  const { queryResult } = useShow<Container>({ resource: "containers" });
  const { list, edit } = useNavigation();
  const navigate = useNavigate();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;

  // Hook ZAWSZE wywołany – zapytanie odpali się dopiero gdy mamy record
  const maintQuery = useList({
    resource: MAINT_RES,
    filters: record
      ? [{ field: "asset_id", operator: "eq", value: record.asset_id }]
      : [],
    sorters: [{ field: "due_at", order: "asc" }],
    pagination: { current: 1, pageSize: 100 },
    queryOptions: { enabled: !!record },
  });

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  const maints = (maintQuery.data?.data as any[]) ?? [];

  const nextDue = maints
    .filter((m) => !m.done_at && m.due_at)
    .sort((a, b) => +new Date(a.due_at) - +new Date(b.due_at))[0];

  const activeIssues = maints.filter((m) => m.service_kind === "usterka" && !m.done_at);

  const historyRepairs = maints
    .filter((m) => m.done_at && ["naprawa", "usterka", "inne"].includes(m.service_kind))
    .sort((a, b) => +new Date(b.done_at) - +new Date(a.done_at));

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("containers")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.code} description={`ID: #${record.id}`} />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => edit("containers", record.id)}>
            <Edit className="w-4 h-4 mr-2" /> Edytuj
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              navigate(
                `/admin/maintenances/create?asset_type=container&asset_id=${record.asset_id}&type=usterka&title=${encodeURIComponent(
                  `Usterka: ${record.code}`,
                )}`,
              )
            }
          >
            <Wrench className="w-4 h-4 mr-2" /> Zgłoś usterkę
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              navigate(
                `/admin/maintenances/create?asset_type=container&asset_id=${record.asset_id}&title=${encodeURIComponent(
                  `Wpis serwisowy: ${record.code}`,
                )}`,
              )
            }
          >
            <Plus className="w-4 h-4 mr-2" /> Dodaj wpis
          </Button>
        </div>
      </FlexBox>

      <Card>
        <CardHeader>
          <CardTitle>Szczegóły</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            {record.category && <Badge variant="outline">{record.category}</Badge>}
            {record.status && <Badge variant="secondary">{record.status}</Badge>}
            {typeof record.tara_kg === "number" && <Badge variant="outline">{record.tara_kg} kg</Badge>}
            <Badge variant="outline">oddział #{record.branch_id}</Badge>
            {record.is_archived && <Badge variant="destructive">archiwum</Badge>}
          </div>
          <Separator />
          <div className="text-sm space-y-1">
            {record.created_at && <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>}
            {record.updated_at && <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>}
          </div>
        </CardContent>
      </Card>

      {/* KSIĄŻKA SERWISOWA */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Książka serwisowa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm">
            <b>Następny przegląd:</b>{" "}
            {nextDue?.due_at ? new Date(nextDue.due_at).toLocaleDateString() : "—"}
          </div>
          <Separator />

          <div>
            <div className="font-medium mb-2">Aktywne zgłoszenia usterek</div>
            {activeIssues.length === 0 ? (
              <div className="text-sm text-muted-foreground">Brak aktywnych zgłoszeń.</div>
            ) : (
              <div className="space-y-3">
                {activeIssues.map((i) => (
                  <div key={i.service_id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{i.service_kind}</div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/admin/maintenances/edit/${i.service_id}`)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" /> Zakończ
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Zgłoszono: {i.created_at ? new Date(i.created_at).toLocaleString() : "—"}
                    </div>
                    {i.notes && <div className="text-sm mt-2">{i.notes}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Separator />

          <div>
            <div className="flex items-center justify-between">
              <div className="font-medium">Historia napraw</div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  navigate(
                    `/admin/maintenances/create?asset_type=container&asset_id=${record.asset_id}&type=naprawa&title=${encodeURIComponent(
                      "Naprawa – " + record.code,
                    )}`,
                  )
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Dodaj wpis
              </Button>
            </div>
            {historyRepairs.length === 0 ? (
              <div className="text-sm text-muted-foreground mt-2">Brak zakończonych napraw.</div>
            ) : (
              <div className="space-y-3 mt-2">
                {historyRepairs.map((h) => (
                  <div key={h.service_id} className="border rounded-lg p-3">
                    <div className="font-medium">{h.service_kind}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {h.done_at ? new Date(h.done_at).toLocaleDateString() : "—"}
                    </div>
                    {h.notes && <div className="text-sm mt-2">{h.notes}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </SubPage>
  );
};
