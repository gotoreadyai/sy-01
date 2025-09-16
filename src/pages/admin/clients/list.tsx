// ================================
// path: src/pages/admin/clients/list.tsx
// ================================
import { useTable, useNavigation, useExport, useUpdateMany } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus, Download, Archive } from "lucide-react";
import { PaginationSwith } from "@/components/navigation";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";
import React from "react";

const SECTIONS = ["zakupy", "sprzedaz", "firmy_transportowe", "inne"];
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
];
const CLEAR_VALUE = "__clear__";

export const ClientsList: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters, sorters, setSorters,
  } = useTable({
    resource: "clients",
    sorters: { initial: [{ field: "created_at", order: "desc" }] },
    filters: { initial: [] },
    syncWithLocation: true,
  });

  const { create, edit, show } = useNavigation();
  const init = useLoading({ isLoading, isError });
  const [selected, setSelected] = React.useState<number[]>([]);
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
    pageSize: 1000, // pociągnie batchem
    maxItemCount: 100000,
    exportOptions: { filename: "clients.csv" },
  });

  if (init) return init;

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

  const toggleSelect = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const bulkArchive = () => {
    if (selected.length === 0) return;
    archiveMany(
      {
        resource: "clients",
        ids: selected,
        values: { is_archived: true },
      },
      { onSuccess: () => setSelected([]) },
    );
  };

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Klienci" description="Baza klientów" />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => triggerExport()} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" /> {isExporting ? "Eksport..." : "Eksport CSV"}
          </Button>
          <Button variant="outline" onClick={bulkArchive} disabled={isArchiving || selected.length === 0}>
            <Archive className="w-4 h-4 mr-2" /> Archiwizuj zaznaczonych
          </Button>
          <Button onClick={() => create("clients")}>
            <Plus className="w-4 h-4 mr-2" /> Dodaj klienta
          </Button>
        </div>
      </FlexBox>

      <FlexBox className="gap-3 flex-wrap">
        <Input
          placeholder="Szukaj po nazwie..."
          className="max-w-sm"
          onChange={(e) => onSearch(e.target.value)}
        />

        <Select onValueChange={(v) => (v === CLEAR_VALUE ? onSection(undefined) : onSection(v))}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filtr: sekcja" />
          </SelectTrigger>
          <SelectContent>
            {SECTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            <SelectItem value={CLEAR_VALUE}>Wyczyść filtr</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => (v === CLEAR_VALUE ? onCategory(undefined) : onCategory(v))}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filtr: kategoria" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            <SelectItem value={CLEAR_VALUE}>Wyczyść filtr</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Filtr: oddział (ID)"
          className="w-40"
          onChange={(e) => onBranch(e.target.value || undefined)}
        />

        <Select onValueChange={(v) => onArchived(v === CLEAR_VALUE ? undefined : v)}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filtr: archiwum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">Tylko aktywne</SelectItem>
            <SelectItem value="true">Tylko archiwalne</SelectItem>
            <SelectItem value={CLEAR_VALUE}>Wyczyść filtr</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-8" />

        <Select
          onValueChange={(v) =>
            setSorters([{ field: v.replace("-", ""), order: v.startsWith("-") ? "desc" : "asc" } as any])
          }
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Sortuj według" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nazwa A→Z</SelectItem>
            <SelectItem value="-name">Nazwa Z→A</SelectItem>
            <SelectItem value="-created_at">Najnowsze</SelectItem>
            <SelectItem value="-updated_at">Ostatnia aktualizacja</SelectItem>
          </SelectContent>
        </Select>
      </FlexBox>

      <GridBox>
        {data?.data?.map((c: any) => {
          const checked = selected.includes(c.id);
          return (
            <Card key={c.id} className={checked ? "ring-2 ring-primary" : ""}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <Lead title={c.name} description={c.email || c.phone || c.website || "—"} variant="card" />
                <input
                  type="checkbox"
                  aria-label="Zaznacz klienta"
                  checked={checked}
                  onChange={() => toggleSelect(c.id)}
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
                <FlexBox variant="start" className="gap-2">
                  <Button variant="outline" size="sm" onClick={() => show("clients", c.id)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => edit("clients", c.id)}>
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
