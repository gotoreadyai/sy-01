// ================================
// path: src/pages/admin/reports/report-client-activity.tsx
// ================================
import React from "react";
import { useTable, type CrudFilters } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { SubPage } from "@/components/layout";
import { LookupSelect } from "@/components/form/LookupSelect";

const toCSV = (rows: any[]) => {
  const headers = Object.keys(rows[0] || {});
  const escape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join("\n");
};

export const ClientActivity: React.FC = () => {
  const [clientId, setClientId] = React.useState<number | undefined>();
  const [from, setFrom] = React.useState<string>("");
  const [to, setTo] = React.useState<string>("");

  // Zbuduj filtry z poprawnym typem
  const permanentFilters: CrudFilters = React.useMemo(
    () => [
      ...(clientId ? [{ field: "client_id", operator: "eq" as const, value: clientId }] : []),
      ...(from ? [{ field: "start_at", operator: "gte" as const, value: from }] : []),
      ...(to ? [{ field: "start_at", operator: "lte" as const, value: to }] : []),
    ],
    [clientId, from, to],
  );

  const { tableQuery } = useTable({
    resource: "tasks",
    filters: { permanent: permanentFilters },
    pagination: { current: 1, pageSize: 1000 },
    sorters: { initial: [{ field: "start_at", order: "desc" as const }] },
    queryOptions: { enabled: !!clientId },
  });

  const loading = tableQuery.isLoading;
  const error = tableQuery.isError;
  const rows = (tableQuery.data?.data || []).map((t: any) => ({
    id: t.id,
    title: t.title,
    type: t.type,
    status: t.status,
    branch_id: t.branch_id,
    start_at: t.start_at,
    end_at: t.end_at ?? "",
  }));

  const exportCSV = () => {
    if (!rows.length) return;
    const blob = new Blob([toCSV(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `client-${clientId}-activity.csv`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Raport: Aktywność klienta" description="Wydarzenia/zadania powiązane z klientem w zakresie dat" />
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => tableQuery.refetch?.()}
            disabled={!clientId || loading}
          >
            Odśwież
          </Button>
          <Button onClick={exportCSV} disabled={!rows.length || loading}>
            Eksport CSV
          </Button>
        </div>
      </FlexBox>

      <Card>
        <CardHeader>
          <CardTitle>Filtry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <LookupSelect
              resource="clients"
              value={clientId}
              onChange={(v) => setClientId(v ? Number(v) : undefined)}
              renderLabel={(c: any) => `${c.name}${c.category ? " — " + c.category : ""} (#${c.id})`}
              placeholder="Wybierz klienta (wymagane)"
            />
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Od" />
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Do" />
          </div>
          <div className="text-xs text-muted-foreground mt-2">Uwaga: raport ładuje się dopiero po wyborze klienta.</div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Wyniki {rows.length ? `(${rows.length})` : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-sm text-red-600">Błąd podczas pobierania danych.</div>}
          {!loading && !rows.length && clientId && (
            <div className="text-sm text-muted-foreground">Brak danych dla wybranych filtrów.</div>
          )}
          {!clientId && <div className="text-sm text-muted-foreground">Wybierz klienta, aby zobaczyć wyniki.</div>}
          {loading && <div className="text-sm text-muted-foreground">Ładowanie…</div>}

          {!!rows.length && (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left border-b">
                  <tr>
                    <th className="py-2 pr-3">ID</th>
                    <th className="py-2 pr-3">Tytuł</th>
                    <th className="py-2 pr-3">Typ</th>
                    <th className="py-2 pr-3">Status</th>
                    <th className="py-2 pr-3">Oddział</th>
                    <th className="py-2 pr-3">Start</th>
                    <th className="py-2 pr-3">Koniec</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b last:border-b-0">
                      <td className="py-2 pr-3">{r.id}</td>
                      <td className="py-2 pr-3">{r.title}</td>
                      <td className="py-2 pr-3">{r.type}</td>
                      <td className="py-2 pr-3">{r.status}</td>
                      <td className="py-2 pr-3">{r.branch_id}</td>
                      <td className="py-2 pr-3">{r.start_at}</td>
                      <td className="py-2 pr-3">{r.end_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </SubPage>
  );
};
