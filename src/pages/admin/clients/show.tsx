// ================================
// path: src/pages/admin/clients/show.tsx
// ================================
import { useShow, useNavigation, useList, useMany } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";
import * as React from "react";
import { ClientAddressLinker } from "./ClientAddressLinker";


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

type ClientAddress = {
  id: number;
  client_id: number;
  address_id: number;
  kind?: string | null;
};

type Address = {
  id: number;
  line1: string;
  line2?: string | null;
  postal_code?: string | null;
  city?: string | null;
  country?: string | null;
  notes?: string | null;
};

export const ClientsShow: React.FC = () => {
  const { queryResult } = useShow<Client>({ resource: "clients" });
  const { list, edit } = useNavigation();

  // Dane klienta
  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;
  const clientId = record?.id;

  // 🔐 HOOKI ZAWSZE NA GÓRZE KOMPONENTU (bez warunków)
  // Linki klient<->adres
  const linksQ = useList<ClientAddress>({
    resource: "client_addresses",
    filters: clientId ? [{ field: "client_id", operator: "eq", value: clientId }] : [],
    pagination: { pageSize: 100 },
    queryOptions: { enabled: !!clientId }, // odpal tylko gdy znamy ID klienta
  });

  // Szczegóły adresów
  const addressIds = (linksQ.data?.data || []).map((x) => x.address_id);
  const addressesQ = useMany<Address>({
    resource: "addresses",
    ids: addressIds,
    queryOptions: { enabled: !!clientId && addressIds.length > 0 }, // bezpieczny guard
  });

  // Dopiero TERAZ wczesne returny
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
            <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>
            <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader><CardTitle>Adresy klienta</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ClientAddressLinker clientId={record.id} onLinked={() => linksQ.refetch()} />

          <Separator />

          {(linksQ.isLoading || addressesQ.isLoading) && <div>Ładowanie adresów...</div>}
          {!linksQ.isLoading && addressIds.length === 0 && (
            <div className="text-sm text-muted-foreground">Brak powiązanych adresów.</div>
          )}
          {addressIds.length > 0 && (
            <div className="space-y-3">
              {(linksQ.data?.data || []).map((link) => {
                const addr = addressesQ.data?.data?.find((a) => a.id === link.address_id);
                return (
                  <div key={link.id} className="rounded border p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{link.kind || "adres"}</Badge>
                      <Badge variant="secondary">ID #{link.address_id}</Badge>
                    </div>
                    {addr ? (
                      <div className="text-sm leading-6">
                        <div>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</div>
                        <div>{[addr.postal_code, addr.city].filter(Boolean).join(" ")}</div>
                        <div>{addr.country || "PL"}</div>
                        {addr.notes && <div className="text-muted-foreground mt-1">{addr.notes}</div>}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Nie udało się pobrać szczegółów adresu.</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </SubPage>
  );
};
