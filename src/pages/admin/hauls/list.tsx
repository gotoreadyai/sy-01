// ================================
// path: src/pages/admin/hauls/list.tsx
// ================================
import React from "react";
import { useTable, useNavigation, useOne, useList } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input, Select, SelectTrigger, SelectValue, SelectItem, SelectContent, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus } from "lucide-react";
import { PaginationSwith } from "@/components/navigation";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";

const HAULS_TABLE = "dispatches";
const STATUSES = ["plan", "w_drodze", "zaladowany", "rozladowany", "zakonczony", "anulowany"] as const;

type Dispatch = {
  id: number;
  title: string;
  status?: string | null;
  branch_id: number;
  start_at: string; // <— WAŻNE: timestamp w bazie
  end_date?: string | null;
  driver_id?: string | null;
  vehicle_id?: number | null;
  trailer_id?: number | null;
  external_transport_client_id?: number | null;
  freight_rate?: number | null;
  freight_currency?: string | null;
  notes?: string | null;
};

export const HaulsList: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable<Dispatch>({
    resource: "dispatches",
    meta: { table: HAULS_TABLE },
    // <-- ZMIANA: sortujemy po start_at (timestamp)
    sorters: { initial: [{ field: "start_at", order: "desc" }] },
  });

  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  if (init) return init;

  const onSearch = (value: string) =>
    setFilters([{ field: "title", operator: "contains", value }]);

  const onStatus = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "status");
      return value ? [...others, { field: "status", operator: "eq", value }] : others;
    });

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Wywozy" description="Transport długodystansowy" />
        <Button onClick={() => create("dispatches")}>
          <Plus className="w-4 h-4 mr-2" /> Nowy wywóz
        </Button>
      </FlexBox>

      <FlexBox className="gap-3">
        <Input placeholder="Szukaj po tytule…" className="max-w-sm" onChange={(e) => onSearch(e.target.value)} />
        <Select onValueChange={(v) => (v === "__clear__" ? onStatus(undefined) : onStatus(v))}>
          <SelectTrigger className="w-56"><SelectValue placeholder="Filtr: status (opcjonalnie)" /></SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            <SelectItem value="__clear__">Wyczyść filtr</SelectItem>
          </SelectContent>
        </Select>
      </FlexBox>

      <GridBox>
        {data?.data?.map((h, i) => {
          const lp = (current - 1) * pageSize + i + 1;

          return (
            <Card key={h.id}>
              <CardHeader>
                <Lead
                  title={h.title}
                  description={`Start: ${new Date(h.start_at).toLocaleString()}`} // <-- ZMIANA
                  variant="card"
                />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">ID #{h.id}</Badge>
                  {h.status && <Badge variant="secondary">{h.status}</Badge>}
                  {h.vehicle_id && <Badge variant="outline">pojazd #{h.vehicle_id}</Badge>}
                  {h.trailer_id && <Badge variant="outline">naczepa #{h.trailer_id}</Badge>}
                  {h.external_transport_client_id && <Badge variant="outline">zewn. transport #{h.external_transport_client_id}</Badge>}
                </div>

                <DetailsGrid
                  lp={lp}
                  dispatch={h}
                />
              </CardContent>

              <CardFooter>
                <FlexBox variant="start" className="gap-2">
                  <Button variant="outline" size="sm" onClick={() => show("dispatches", h.id)}><Eye className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => edit("dispatches", h.id)}><Edit className="w-4 h-4" /></Button>
                </FlexBox>
              </CardFooter>
            </Card>
          );
        })}
      </GridBox>

      <PaginationSwith
        current={current}
        pageSize={pageSize}
        total={data?.total || 0}
        setCurrent={setCurrent}
        itemName="wywozy"
      />
    </SubPage>
  );
};

// --- Podkomponenty pomocnicze ---

const DetailsGrid: React.FC<{ lp: number; dispatch: Dispatch }> = ({ lp, dispatch }) => {
  return (
    <div className="text-sm space-y-2">
      <Row label="Lp."><span>{lp}</span></Row>
      <Row label="Kierowca">
        {dispatch.driver_id ? <DriverName id={dispatch.driver_id} /> : <span>—</span>}
      </Row>
      <Row label="Skąd"><BranchName id={dispatch.branch_id} /></Row>
      <Row label="Dokąd / Materiał / Powrót / Dokąd (powrót)">
        <SegmentsMini dispatchId={dispatch.id} />
      </Row>
      <Row label="Notatki"><span>{dispatch.notes || "—"}</span></Row>
      <Row label="Stawka za fracht">
        {typeof dispatch.freight_rate === "number"
          ? <span>{dispatch.freight_rate.toFixed(2)} {dispatch.freight_currency || "PLN"}</span>
          : <span>—</span>}
      </Row>
    </div>
  );
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="grid grid-cols-12 items-start gap-2">
    <div className="col-span-12 md:col-span-3 text-muted-foreground">{label}</div>
    <div className="col-span-12 md:col-span-9">{children}</div>
    <Separator className="col-span-12 my-1" />
  </div>
);

// Kierowca: pobieramy z view `users` (full_name lub e-mail). Fallback: skrót UUID.
const DriverName: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useOne({
    resource: "users",
    id,
    meta: { select: "full_name,email,id" } as any,
    queryOptions: { enabled: !!id },
  });

  if (isLoading) return <span>Ładowanie…</span>;
  const u: any = data?.data;
  if (!u) return <span>#{String(id).slice(0, 8)}</span>;

  const label = u.full_name || u.email || `#${String(u.id || id).slice(0, 8)}`;
  return <span>{label}</span>;
};

// Oddział: nazwa + miasto
const BranchName: React.FC<{ id: number }> = ({ id }) => {
  const { data, isLoading } = useOne({
    resource: "branches",
    id,
    meta: { select: "name,city,id" } as any,
    queryOptions: { enabled: !!id },
  });

  if (isLoading) return <span>Ładowanie…</span>;
  const b: any = data?.data;
  if (!b) return <span>oddział #{id}</span>;

  return <span>{b.name}{b.city ? ` — ${b.city}` : ""} (#{b.id})</span>;
};

// Segmenty: wyciągamy pierwszy i ostatni punkt, materiały oraz info o powrocie
const SegmentsMini: React.FC<{ dispatchId: number }> = ({ dispatchId }) => {
  const { data, isLoading } = useList({
    resource: "dispatch_segments",
    filters: [{ field: "dispatch_id", operator: "eq", value: dispatchId }],
    sorters: [{ field: "seq", order: "asc" }],
    meta: {
      select: "seq,kind,material_desc,is_return_empty,client:clients(name),address:addresses(city,line1)"
    } as any,
  });

  if (isLoading) return <span>Ładowanie trasy…</span>;
  const segs: any[] = data?.data || [];
  if (!segs.length) return <span>Dokąd: — • Materiał: — • Powrót: — • Dokąd (powrót): —</span>;

  const first = segs[0];
  const last = segs[segs.length - 1];

  const labelOf = (s: any) =>
    s?.client?.name ||
    s?.address?.city ||
    s?.address?.line1 ||
    "—";

  const to = labelOf(last);

  const matsAll = segs.map((s) => (s.material_desc || "").trim()).filter(Boolean);
  const matsUniq = Array.from(new Set(matsAll));
  const materials =
    matsUniq.length > 2 ? `${matsUniq.slice(0, 2).join(", ")} +${matsUniq.length - 2}` :
    matsUniq.join(", ") || "—";

  const anyReturnEmpty = segs.some((s) => s.is_return_empty === true);
  const powrot = anyReturnEmpty ? "pusto" : (segs.length > 1 ? "ładunek" : "—");
  const dokadPowrot = !anyReturnEmpty && segs.length > 1 ? to : "—";

  return (
    <span>
      <b>Dokąd:</b> {to} • <b>Materiał:</b> {materials} • <b>Powrót:</b> {powrot} • <b>Dokąd (powrót):</b> {dokadPowrot}
    </span>
  );
};
