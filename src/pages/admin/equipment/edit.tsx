// ================================
// path: src/pages/admin/equipment/edit.tsx
// ================================
import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { LookupSelect } from "@/components/form/LookupSelect";

const TYPES = ["koparka", "wozek_widlowy", "prasa", "inne"] as const;
const STATUS = [
  { value: "dostepny", label: "Dostępny", archived: false },
  { value: "archiwum", label: "Archiwum", archived: true },
] as const;

export const EquipmentEdit = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register, handleSubmit, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "yard_equipment", action: "edit" } });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("yard_equipment", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox><Lead title="Edycja maszyny" description={`ID: #${record.id}`} /></FlexBox>

      <Card>
        <CardHeader><CardTitle>Dane podstawowe</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <input type="hidden" {...register("is_archived")} />

            <GridBox variant="1-2-2">
              <FormControl label="Nazwa" htmlFor="name" error={errors.name?.message as string} required>
                <Input id="name" {...register("name", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Kategoria (type)" required>
                <Select defaultValue={record.type} onValueChange={(v) => setValue("type", v, { shouldValidate: true })}>
                  <SelectTrigger><SelectValue placeholder="Wybierz typ" /></SelectTrigger>
                  <SelectContent>{TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Oddział (branch_id)" required error={errors.branch_id?.message as string}>
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id") ?? record.branch_id}
                  onChange={(v) => setValue("branch_id", Number(v), { shouldValidate: true })}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Wybierz oddział"
                />
              </FormControl>

              <FormControl label="Status">
                <Select
                  defaultValue={record.is_archived ? "archiwum" : "dostepny"}
                  onValueChange={(v) => {
                    const opt = STATUS.find((s) => s.value === v);
                    setValue("is_archived", !!opt?.archived, { shouldValidate: true });
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="Wybierz status" /></SelectTrigger>
                  <SelectContent>{STATUS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                </Select>
              </FormControl>
            </GridBox>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show("yard_equipment", record.id)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Zapisywanie..." : "Zapisz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
