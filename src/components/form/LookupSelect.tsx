// ================================
// path: src/components/form/LookupSelect.tsx
// ================================
import React, { useMemo } from "react";
import { useList, type CrudFilters, type CrudSort } from "@refinedev/core";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type LookupSelectProps<T = any> = {
  resource: string;
  value?: string | number | null;
  onChange: (v: string) => void;
  valueField?: keyof T | string;
  labelField?: keyof T | string;
  renderLabel?: (row: T) => React.ReactNode;
  placeholder?: string;
  pageSize?: number;
  /** -> przekazuj po prostu tablicę filtrów CrudFilters (bez { permanent: [...] }) */
  filters?: CrudFilters;
};

export const LookupSelect = <T extends Record<string, any> = any>({
  resource,
  value,
  onChange,
  valueField = "id",
  labelField,
  renderLabel,
  placeholder = "Wybierz…",
  pageSize = 100,
  filters,
}: LookupSelectProps<T>) => {
  // Dla useList: filters: CrudFilters, sorters: CrudSort[]
  const sorters: CrudSort[] = [
    { field: String(labelField ?? valueField), order: "asc" },
  ];

  const { data, isLoading, isError } = useList<T>({
    resource,
    filters, // <- już tablica, np. [{ field: "is_archived", operator: "eq", value: false }]
    sorters, // <- tablica
    pagination: { current: 1, pageSize },
  });

  const rows = data?.data ?? [];

  const items = useMemo(() => {
    return rows.map((row: any) => {
      const id = String(row[valueField as string]);
      const label =
        renderLabel
          ? renderLabel(row)
          : labelField
            ? String(row[labelField as string] ?? id)
            : id;
      return { id, label };
    });
  }, [rows, valueField, labelField, renderLabel]);

  const disabled = isLoading || isError || items.length === 0;

  return (
    <Select
      value={value != null ? String(value) : undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={
            isLoading ? "Ładowanie…" : (isError ? "Błąd ładowania" : placeholder)
          }
        />
      </SelectTrigger>
      <SelectContent>
        {items.map((opt) => (
          <SelectItem key={opt.id} value={opt.id}>
            {opt.label as any}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
