// ================================
// path: src/pages/admin/equipment/show.tsx
// ================================
import React from "react";
import { useShow, useNavigation, useList } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit, Plus, Wrench, CheckCircle } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { RES as MAINT_RES } from "../maintenances/index";

type Equipment = {
  id: number;
  name: string;
  type: string;
  branch_id: number;
  service_notes?: string | null;
  is_archived?: boolean;
  created_at?: string;
  updated_at?: string;
};

export const EquipmentShow = () => {
  const { queryResult } = useShow<Equipment>({ resource: "yard_equipment" });
  const { list, edit } = useNavigation();
  const navigate = useNavigate();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  // Pobranie powiązanych wpisów serwisowych
  const maintQuery = useList({
    resource: MAINT_RES,
    filters: [
      { field: "asset_type", operator: "eq", value: "equipment" },
      { field: "asset_id", operator: "eq", value: record.id },
    ],
    sorters: [{ field: "due_at", order: "asc" }],
    pagination: { current: 1, pageSize: 100 }, // prosta książka serwisowa
  });

  const maints = (maintQuery.data?.data as any[]) ?? [];

  const nextDue = maints
    .filter((m) => !m.completed_at && m.due_at)
    .sort((a, b) => (new Date(a.due_at).getTime() - new Date(b.due_at).getTime()))[0];

  const activeIssues = maints.filter((m) => m.type === "usterka" && !m.completed_at);
  const historyRepairs = maints
    .filter((m) => !!m.completed_at && (m.type === "naprawa" || m.type === "usterka" || m.type === "inne"))
    .sort((a, b) => (new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime()));

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("yard_equipment")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.name} description={`ID: #${record.id}`} />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => edit("yard_equipment", record.id)}>
            <Edit className="w-4 h-4 mr-2" /> Edytuj
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/maintenances/create?asset_type=equipment&asset_id=${record.id}&type=usterka&title=${encodeURIComponent(`Usterka: ${record.name}`)}`)}
          >
            <Wrench className="w-4 h-4 mr-2" /> Zgłoś usterkę
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/maintenances/create?asset_type=equipment&asset_id=${record.id}&title=${encodeURIComponent(`Wpis serwisowy: ${record.name}`)}`)}
          >
            <Plus className="w-4 h-4 mr-2" /> Dodaj wpis
          </Button>
        </div>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Badge variant="secondary">{record.type}</Badge>
            <Badge variant="outline">oddział #{record.branch_id}</Badge>
            {record.is_archived ? (
              <Badge variant="destructive">archiwum</Badge>
            ) : (
              <Badge variant="outline">dostępny</Badge>
            )}
          </div>
          <Separator />
          <div className="text-sm space-y-1">
            {record.service_notes && <div><b>Serwis:</b> {record.service_notes}</div>}
            {record.created_at && <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>}
            {record.updated_at && <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>}
          </div>
        </CardContent>
      </Card>

      {/* KSIĄŻKA SERWISOWA */}
      <Card className="mt-4">
        <CardHeader><CardTitle>Książka serwisowa</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {/* Terminy */}
          <div>
            <div className="font-medium mb-1">Terminy</div>
            <div className="text-sm">
              <b>Następny przegląd:</b>{" "}
              {nextDue?.due_at ? new Date(nextDue.due_at).toLocaleDateString() : "—"}
            </div>
          </div>
          <Separator />

          {/* Aktywne zgłoszenia usterek */}
          <div>
            <div className="font-medium mb-2">Aktywne zgłoszenia usterek</div>
            {activeIssues.length === 0 ? (
              <div className="text-sm text-muted-foreground">Brak aktywnych zgłoszeń.</div>
            ) : (
              <div className="space-y-3">
                {activeIssues.map((i) => (
                  <div key={i.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{i.title}</div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/admin/maintenances/edit/${i.id}`)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Zrealizuj naprawę
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Zgłoszono: {i.created_at ? new Date(i.created_at).toLocaleString() : "—"}
                      {/* Jeśli masz autora w bazie, można tu dodać „przez ...” */}
                    </div>
                    {i.notes && <div className="text-sm mt-2">{i.notes}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Separator />

          {/* Historia napraw */}
          <div>
            <div className="flex items-center justify-between">
              <div className="font-medium">Historia napraw</div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/admin/maintenances/create?asset_type=equipment&asset_id=${record.id}&type=naprawa&title=${encodeURIComponent("Naprawa – " + record.name)}`)}
              >
                <Plus className="w-4 h-4 mr-2" /> Dodaj wpis
              </Button>
            </div>
            {historyRepairs.length === 0 ? (
              <div className="text-sm text-muted-foreground mt-2">Brak zakończonych napraw.</div>
            ) : (
              <div className="space-y-3 mt-2">
                {historyRepairs.map((h) => (
                  <div key={h.id} className="border rounded-lg p-3">
                    <div className="font-medium">{h.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {h.completed_at ? new Date(h.completed_at).toLocaleDateString() : "—"}
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
