// ================================
// path: src/pages/admin/addresses/list.tsx
// ================================
import { useTable, useNavigation, type CrudFilters } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, Button, Input } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Eye, Edit, Plus } from "lucide-react";
import { PaginationSwith } from "@/components/navigation";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";
import React from "react";

export const AddressesList: React.FC = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current, setCurrent, pageSize, setFilters,
  } = useTable({
    resource: "addresses",
    sorters: { initial: [{ field: "id", order: "desc" }] },
  });
  const { create, edit, show } = useNavigation();

  const init = useLoading({ isLoading, isError });
  if (init) return init;

  // proste wyszukiwanie po line1 — nadpisuje filtry
  const onSearch = (value: string) => {
    const filters: CrudFilters = value
      ? [{ field: "line1", operator: "contains" as const, value }]
      : [];
    setFilters(filters);
  };

  // filtr po mieście — dokłada/usuwa filtr "city"
  const onCity = (value: string) =>
    setFilters((prev): CrudFilters => {
      const others = (prev || []).filter(
        (f: any) => !("field" in f) || f.field !== "city",
      ) as CrudFilters;
      return value
        ? [...others, { field: "city", operator: "contains" as const, value }]
        : others;
    });

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Adresy" description="Baza adresów (globalna)" />
        <Button onClick={() => create("addresses")}>
          <Plus className="w-4 h-4 mr-2" /> Dodaj adres
        </Button>
      </FlexBox>

      <FlexBox className="gap-3 flex-wrap">
        <Input
          placeholder="Szukaj (linia 1)..."
          className="max-w-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Input
          placeholder="Filtr: miasto"
          className="w-56"
          onChange={(e) => onCity(e.target.value)}
        />
      </FlexBox>

      <GridBox>
        {data?.data?.map((a: any) => (
          <Card key={a.id}>
            <CardHeader>
              <Lead
                title={a.line1}
                description={a.city || a.postal_code || a.country || "—"}
                variant="card"
              />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">ID #{a.id}</Badge>
                {a.city && <Badge variant="secondary">{a.city}</Badge>}
                {a.country && <Badge variant="outline">{a.country}</Badge>}
                {(a.lat || a.lng) && <Badge variant="outline">geo</Badge>}
                {a.geofence_radius_m && (
                  <Badge variant="outline">r={a.geofence_radius_m}m</Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => show("addresses", a.id)}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => edit("addresses", a.id)}>
                <Edit className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </GridBox>

      <PaginationSwith
        current={current}
        pageSize={pageSize}
        total={data?.total || 0}
        setCurrent={setCurrent}
        itemName="adresy"
      />
    </SubPage>
  );
};
