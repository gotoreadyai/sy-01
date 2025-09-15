// ================================
// path: src/pages/admin/calendar/Calendar.tsx
// ================================
import * as React from "react";
import { useTable } from "@refinedev/core";
import type { CrudFilters } from "@refinedev/core";
import { SubPage } from "@/components/layout";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Separator } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { LookupSelect } from "@/components/form/LookupSelect";
import { useLoading } from "@/utility";

/**
 * Prosty kalendarz-lista:
 * - Filtry: oddział (LookupSelect), typ, status, wyszukiwarka po tytule
 * - Dane: `tasks`, posortowane malejąco po start_at
 * - Brak twardo zakodowanych wartości oddziałów — wszystko z bazy
 */

const TYPES = ["transport", "plac"] as const;
const STATUSES = ["nowe", "w_realizacji", "zakonczone", "anulowane"] as const;

type Task = {
  id: string | number;
  title: string;
  type: (typeof TYPES)[number] | string;
  status: (typeof STATUSES)[number] | string;
  branch_id: number;
  start_at: string;
  end_at?: string | null;
  assigned_driver?: string | null;
  assigned_vehicle_id?: number | null;
  assigned_container_id?: number | null;
};

const Calendar: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    setFilters,
  } = useTable<Task>({
    resource: "tasks",
    sorters: { initial: [{ field: "start_at", order: "desc" }] },
    // na starcie bez filtrów; logikę dokładamy przez setFilters
  });

  const init = useLoading({ isLoading, isError });
  if (init) return init;

  // ————— Handlery filtrów (wszystkie zwracają poprawny CrudFilters) —————

  /** Szukaj po tytule (contains) */
  const onSearchTitle = (value: string) => {
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => (f as any).field !== "title");
      const next: CrudFilters =
        value?.trim()
          ? [
              ...others,
              { field: "title", operator: "contains", value: value.trim() },
            ]
          : others;
      return next;
    });
  };

  /** Filtr oddziału (eq) */
  const onBranch = (v?: string) => {
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => (f as any).field !== "branch_id");
      const next: CrudFilters =
        v && v !== ""
          ? [...others, { field: "branch_id", operator: "eq", value: Number(v) }]
          : others;
      return next;
    });
  };

  /** Filtr typu */
  const onType = (v?: string) => {
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => (f as any).field !== "type");
      const next: CrudFilters = v && v !== "" ? [...others, { field: "type", operator: "eq", value: v }] : others;
      return next;
    });
  };

  /** Filtr statusu */
  const onStatus = (v?: string) => {
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => (f as any).field !== "status");
      const next: CrudFilters = v && v !== "" ? [...others, { field: "status", operator: "eq", value: v }] : others;
      return next;
    });
  };

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Kalendarz / Plan" description="Filtrowanie i przegląd zadań" />
      </FlexBox>

      {/* Filtry */}
      <FlexBox className="gap-3">
        {/* Oddział – LookupSelect z resource=branches */}
        <div className="min-w-[260px]">
          <LookupSelect
            resource="branches"
            placeholder="Filtr: oddział (opcjonalnie)"
            onChange={onBranch}
            renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
          />
        </div>

        {/* Typ */}
        <Select onValueChange={(v) => onType(v)} >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filtr: typ (opcjonalnie)" />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
            {/* celowo brak pustej wartości — czyszczenie robimy przez zamknięcie selecta bez wyboru
                lub można dodać pozycję 'Wyczyść' z własną wartością i w handlerze obsłużyć */}
            <SelectItem value="__clear_type__">Wyczyść filtr typu</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select onValueChange={(v) => (v === "__clear_status__" ? onStatus(undefined) : onStatus(v))}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filtr: status (opcjonalnie)" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
            <SelectItem value="__clear_status__">Wyczyść filtr statusu</SelectItem>
          </SelectContent>
        </Select>

        {/* Szukaj po tytule */}
        <Input
          className="max-w-sm"
          placeholder="Szukaj po tytule…"
          onChange={(e) => onSearchTitle(e.target.value)}
        />
      </FlexBox>

      {/* Lista „kalendarzowa” (prosta karta na task) */}
      <GridBox>
        {data?.data?.map((t) => (
          <Card key={t.id}>
            <CardHeader>
              <CardTitle className="text-base">{t.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{t.type}</Badge>
                <Badge variant="outline">{t.status}</Badge>
                <Badge variant="outline">oddział #{t.branch_id}</Badge>
                {t.assigned_vehicle_id && <Badge variant="outline">pojazd #{t.assigned_vehicle_id}</Badge>}
                {t.assigned_container_id && <Badge variant="outline">kontener #{t.assigned_container_id}</Badge>}
              </div>
              <Separator />
              <div className="text-sm">
                <div><b>Start:</b> {new Date(t.start_at).toLocaleString()}</div>
                {t.end_at && <div><b>Koniec:</b> {new Date(t.end_at).toLocaleString()}</div>}
                {t.assigned_driver && <div><b>Kierowca (UUID):</b> {t.assigned_driver}</div>}
              </div>
            </CardContent>
          </Card>
        ))}
      </GridBox>
    </SubPage>
  );
};

export default Calendar;

// — aliasy dla zgodności z istniejącymi importami nazwanymi:
export const CalendarWeekly = Calendar;
export const CalendarDaily = Calendar;
export const CalendarMonthly = Calendar;
