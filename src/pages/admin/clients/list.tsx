// ================================
// path: src/pages/admin/clients/list.tsx
// ================================
import { useTable, useNavigation, useExport, useUpdateMany } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus, Download, Archive, Filter } from "lucide-react";
import { PaginationSwith } from "@/components/navigation";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";
import React from "react";

const SECTIONS = ["zakupy", "sprzedaz", "firmy_transportowe", "inne"] as const;
const CATEGORIES = [
  "skupy złomu",
  "autokasacja",
  "zakład produkcyjny",
  "spalarnia",
  "huta",
  "port",
  "pośrednik",
  "kontenery",
  "odlewnia",
  "inne",
] as const;
const CLEAR_VALUE = "__clear__";

// ————————————————————————————————————————————————————————
// Komponent filtrów (w tym samym module)
// ————————————————————————————————————————————————————————
type ClientsListFiltersProps = {
  sections: readonly string[];
  categories: readonly string[];
  clearValue: string;
  onSearch: (v: string) => void;
  onSection: (v?: string) => void;
  onCategory: (v?: string) => void;
  onBranch: (v?: string) => void;
  onArchived: (v?: string) => void;
  onSortChange: (v: string) => void;
};

const ClientsListFilters: React.FC<ClientsListFiltersProps> = ({
  sections,
  categories,
  clearValue,
  onSearch,
  onSection,
  onCategory,
  onBranch,
  onArchived,
  onSortChange,
}) => {
  return (
    <div
      className="
        grid w-full gap-3 items-end
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
      "
    >
      {/* RZĄD 1 (lg): Szukaj x2, Sekcja, Kategoria */}
      <Input
        placeholder="Szukaj po nazwie..."
        className="w-full min-w-0 md:col-span-2 lg:col-span-2"
        onChange={(e) => onSearch(e.target.value)}
      />

      <Select onValueChange={(v) => onSection(v === clearValue ? undefined : v)}>
        <SelectTrigger className="w-full min-w-0">
          <SelectValue placeholder="Filtr: sekcja" />
        </SelectTrigger>
        <SelectContent>
          {sections.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
          <SelectItem value={clearValue}>Wyczyść filtr</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(v) => onCategory(v === clearValue ? undefined : v)}>
        <SelectTrigger className="w-full min-w-0">
          <SelectValue placeholder="Filtr: kategoria" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
          <SelectItem value={clearValue}>Wyczyść filtr</SelectItem>
        </SelectContent>
      </Select>

      {/* RZĄD 2 (lg): Oddział, Archiwum, Sortuj x2 */}
      <Input
        placeholder="Filtr: oddział (ID)"
        className="w-full min-w-0"
        onChange={(e) => onBranch(e.target.value || undefined)}
        inputMode="numeric"
      />

      <Select onValueChange={(v) => onArchived(v === clearValue ? undefined : v)}>
        <SelectTrigger className="w-full min-w-0">
          <SelectValue placeholder="Filtr: archiwum" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="false">Tylko aktywne</SelectItem>
          <SelectItem value="true">Tylko archiwalne</SelectItem>
          <SelectItem value={clearValue}>Wyczyść filtr</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-full min-w-0 md:col-span-2 lg:col-span-2">
          <SelectValue placeholder="Sortuj według" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Nazwa A→Z</SelectItem>
          <SelectItem value="-name">Nazwa Z→A</SelectItem>
          <SelectItem value="-created_at">Najnowsze</SelectItem>
          <SelectItem value="-updated_at">Ostatnia aktualizacja</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

// ————————————————————————————————————————————————————————
// Główny komponent strony
// ————————————————————————————————————————————————————————
export const ClientsList: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters, setSorters,
  } = useTable({
    resource: "clients",
    sorters: { initial: [{ field: "created_at", order: "desc" }] },
    filters: { initial: [] },
    syncWithLocation: true,
  });

  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  const [selected, setSelected] = React.useState<number[]>([]);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const { mutate: archiveMany, isLoading: isArchiving } = useUpdateMany();

  const { triggerExport, isLoading: isExporting } = useExport<any>({
    resource: "clients",
    mapData: (item) => ({
      id: item.id,
      name: item.name,
      section: item.section,
      category: item.category,
      branch_id: item.branch_id,
      email: item.email,
      phone: item.phone,
      website: item.website,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }),
    pageSize: 1000,
    maxItemCount: 100000,
    exportOptions: { filename: "clients.csv" },
  });

  if (init) return init;

  // ——— Handlery filtrów/sortowania ———
  const onSearch = (value: string) =>
    setFilters((prev) => [
      ...(prev || []).filter((f: any) => f.field !== "name"),
      value ? { field: "name", operator: "contains", value } : undefined,
    ].filter(Boolean) as any[]);

  const onSection = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "section");
      return value ? [...others, { field: "section", operator: "eq", value }] : others;
    });

  const onCategory = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "category");
      return value ? [...others, { field: "category", operator: "eq", value }] : others;
    });

  const onBranch = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "branch_id");
      return value ? [...others, { field: "branch_id", operator: "eq", value: Number(value) }] : others;
    });

  const onArchived = (value?: string) =>
    setFilters((prev) => {
      const others = (prev || []).filter((f: any) => f.field !== "is_archived");
      if (value === "true") return [...others, { field: "is_archived", operator: "eq", value: true }];
      if (value === "false") return [...others, { field: "is_archived", operator: "eq", value: false }];
      return others;
    });

  const onSortChange = (v: string) =>
    setSorters([{ field: v.replace("-", ""), order: v.startsWith("-") ? "desc" : "asc" } as any]);

  const toggleSelect = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const bulkArchive = () => {
    if (selected.length === 0) return;
    archiveMany(
      { resource: "clients", ids: selected, values: { is_archived: true } },
      { onSuccess: () => setSelected([]) },
    );
  };

  return (
    <SubPage>
      {/* Nagłówek — przyciski trzymają się prawej od md */}
      <div className="flex flex-col gap-3 md:flex-row md:items-start">
        <Lead title="Klienci" description="Baza klientów" />
        <div className="flex gap-2 flex-wrap w-full md:w-auto md:ml-auto">
          <Button variant="outline" onClick={() => triggerExport()} disabled={isExporting} className="w-full md:w-auto">
            <Download className="w-4 h-4 mr-2" /> {isExporting ? "Eksport..." : "Eksport CSV"}
          </Button>
          <Button variant="outline" onClick={bulkArchive} disabled={isArchiving || selected.length === 0} className="w-full md:w-auto">
            <Archive className="w-4 h-4 mr-2" /> Archiwizuj zaznaczonych
          </Button>
          <Button onClick={() => create("clients")} className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" /> Dodaj klienta
          </Button>
          {/* Toggler filtrów widoczny na <lg; od lg filtry stale */}
          <Button
            variant="outline"
            className="w-full lg:hidden"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-controls="filters-panel"
          >
            <Filter className="w-4 h-4 mr-2" /> Filtry
          </Button>
        </div>
      </div>

      {/* Filtry — mobile & tablet (<=lg): collapsible; od lg widoczne stale */}
      <div id="filters-panel" className="lg:hidden mt-2">
        {filtersOpen && (
          <div className="rounded-xl border bg-background p-3">
            <ClientsListFilters
              sections={SECTIONS}
              categories={CATEGORIES}
              clearValue={CLEAR_VALUE}
              onSearch={onSearch}
              onSection={onSection}
              onCategory={onCategory}
              onBranch={onBranch}
              onArchived={onArchived}
              onSortChange={onSortChange}
            />
          </div>
        )}
      </div>
      <div className="hidden lg:block mt-2">
        <ClientsListFilters
          sections={SECTIONS}
          categories={CATEGORIES}
          clearValue={CLEAR_VALUE}
          onSearch={onSearch}
          onSection={onSection}
          onCategory={onCategory}
          onBranch={onBranch}
          onArchived={onArchived}
          onSortChange={onSortChange}
        />
      </div>

      <GridBox>
        {data?.data?.map((c: any) => {
          const checked = selected.includes(c.id);
          return (
            <Card key={c.id} className={checked ? "ring-2 ring-primary" : ""}>
              <CardHeader className="flex flex-row items-start justify-between gap-4 flex-wrap">
                <Lead title={c.name} description={c.email || c.phone || c.website || "—"} variant="card" />
                <input
                  type="checkbox"
                  aria-label={`Zaznacz klienta ${c.name}`}
                  checked={checked}
                  onChange={() => toggleSelect(c.id)}
                  className="mt-1"
                />
              </CardHeader>
              <CardContent>
                <FlexBox variant="start" className="gap-2 flex-wrap">
                  <Badge variant="outline">ID #{c.id}</Badge>
                  {c.section && <Badge variant="secondary">{c.section}</Badge>}
                  {c.category && <Badge variant="outline">{c.category}</Badge>}
                  {c.branch_id && <Badge variant="outline">oddział #{c.branch_id}</Badge>}
                  {c.is_archived && <Badge variant="destructive">archiwum</Badge>}
                </FlexBox>
              </CardContent>
              <CardFooter>
                <FlexBox variant="start" className="gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={() => show("clients", c.id)} className="w-full sm:w-auto">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => edit("clients", c.id)} className="w-full sm:w-auto">
                    <Edit className="w-4 h-4" />
                  </Button>
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
        itemName="klienci"
      />
    </SubPage>
  );
};
