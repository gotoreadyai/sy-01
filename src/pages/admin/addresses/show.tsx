// ================================
// path: src/pages/admin/addresses/show.tsx
// ================================
import { useShow, useNavigation, useList, useMany, useCreate, useDelete } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Input, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit, Link2, Trash } from "lucide-react";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";
import * as React from "react";

type Address = {
  id: number;
  line1: string;
  line2?: string | null;
  postal_code?: string | null;
  city?: string | null;
  country?: string | null;
  notes?: string | null;
  lat?: number | null;
  lng?: number | null;
  geofence_radius_m?: number | null;
};

type ClientAddress = { id: number; client_id: number; address_id: number; kind?: string | null };
type Client = { id: number; name: string; section: string; branch_id?: number | null };

export const AddressesShow: React.FC = () => {
  const { queryResult } = useShow<Address>({ resource: "addresses" });
  const { list, edit, show } = useNavigation();

  // 🔹 HOOKI STANU — bezwarunkowo, przed jakimikolwiek return
  const [clientIdInput, setClientIdInput] = React.useState<string>("");
  const [kindInput, setKindInput] = React.useState<string>("Siedziba");

  // 🔹 Dane bazowe
  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;
  const addressId = record?.id;

  // 🔹 Powiązania klient<->adres (hooki również bezwarunkowo, z enabled)
  const linksQ = useList<ClientAddress>({
    resource: "client_addresses",
    filters: addressId ? [{ field: "address_id", operator: "eq", value: addressId }] : [],
    pagination: { pageSize: 100 },
    queryOptions: { enabled: !!addressId },
  });

  const clientIds = (linksQ.data?.data || []).map((l) => l.client_id);

  const clientsQ = useMany<Client>({
    resource: "clients",
    ids: clientIds,
    queryOptions: { enabled: !!addressId && clientIds.length > 0 },
  });

  const { mutate: createLink, isLoading: linking } = useCreate();
  const { mutate: deleteLink, isLoading: unlinking } = useDelete();

  // 🔹 Teraz dopiero wczesne returny
  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  // 🔹 Akcje (mamy już pewne record.id)
  const doLink = () => {
    const cid = Number(clientIdInput);
    if (!cid) return;
    createLink(
      { resource: "client_addresses", values: { client_id: cid, address_id: record.id, kind: kindInput || null } },
      { onSuccess: () => linksQ.refetch() },
    );
  };

  const doUnlink = (linkId: number) => {
    deleteLink(
      { resource: "client_addresses", id: linkId, mutationMode: "pessimistic" },
      { onSuccess: () => linksQ.refetch() },
    );
  };

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("addresses")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.line1} description={`ID: #${record.id}`} />
        <Button variant="outline" onClick={() => edit("addresses", record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {record.city && <Badge variant="secondary">{record.city}</Badge>}
            {record.country && <Badge variant="outline">{record.country}</Badge>}
            {(record.lat || record.lng) && <Badge variant="outline">geo</Badge>}
            {record.geofence_radius_m && <Badge variant="outline">r={record.geofence_radius_m}m</Badge>}
          </div>
          <Separator />
          <div className="text-sm space-y-1">
            {record.line2 && <div><b>Linia 2:</b> {record.line2}</div>}
            {(record.postal_code || record.city) && (
              <div><b>Kod/Miasto:</b> {[record.postal_code, record.city].filter(Boolean).join(" ")}</div>
            )}
            {record.notes && <div><b>Notatki:</b> {record.notes}</div>}
            {(record.lat || record.lng) && <div><b>Geo:</b> {record.lat ?? "—"}, {record.lng ?? "—"}</div>}
            {record.geofence_radius_m && <div><b>Geofencing:</b> r = {record.geofence_radius_m} m</div>}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader><CardTitle>Powiązani klienci</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="ID klienta"
              className="w-36"
              value={clientIdInput}
              onChange={(e) => setClientIdInput(e.target.value)}
            />
            <Input
              placeholder='Etykieta (np. "Siedziba")'
              className="w-56"
              value={kindInput}
              onChange={(e) => setKindInput(e.target.value)}
            />
            <Button onClick={doLink} disabled={linking}>
              <Link2 className="w-4 h-4 mr-2" /> Powiąż
            </Button>
          </div>

          <Separator />

          {linksQ.isLoading || clientsQ.isLoading ? (
            <div>Ładowanie powiązań...</div>
          ) : ((linksQ.data?.data || []).length === 0 ? (
            <div className="text-sm text-muted-foreground">Brak powiązanych klientów.</div>
          ) : (
            <div className="space-y-2">
              {(linksQ.data?.data || []).map((lnk) => {
                const client = clientsQ.data?.data?.find((c) => c.id === lnk.client_id);
                return (
                  <div key={lnk.id} className="flex items-center justify-between rounded border p-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">link #{lnk.id}</Badge>
                      {lnk.kind && <Badge variant="secondary">{lnk.kind}</Badge>}
                      <span className="text-sm">
                        {client ? `${client.name} (ID #${client.id})` : `Klient #${lnk.client_id}`}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => show("clients", lnk.client_id)}>Otwórz klienta</Button>
                      <Button variant="outline" size="sm" onClick={() => doUnlink(lnk.id)} disabled={unlinking}>
                        <Trash className="w-4 h-4 mr-2" /> Usuń powiązanie
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </CardContent>
      </Card>
    </SubPage>
  );
};
