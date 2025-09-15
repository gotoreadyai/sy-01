// ================================
// path: src/pages/admin/containers/edit.tsx
// ================================
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

const STATUSES = ["na_placu", "u_klienta", "na_pojezdzie", "serwis", "inne"] as const;

export const ContainersEdit = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register, handleSubmit, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "containers", action: "edit" } });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("containers", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox><Lead title="Edycja kontenera" description={`ID: #${record.id}`} /></FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Kod / numer" htmlFor="code" error={errors.code?.message as string} required>
                <Input id="code" {...register("code", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Kategoria" htmlFor="category">
                <Input id="category" {...register("category")} />
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
              <FormControl label="Tara [kg]" htmlFor="tara_kg">
                <Input id="tara_kg" type="number" step="1" {...register("tara_kg", { valueAsNumber: true })} />
              </FormControl>
            </GridBox>

            <FormControl label="Status">
              <Select defaultValue={record.status} onValueChange={(v) => setValue("status", v)}>
                <SelectTrigger><SelectValue placeholder="Wybierz status" /></SelectTrigger>
                <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </FormControl>

            <FormControl label="Archiwum">
              <input type="checkbox" {...register("is_archived")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show("containers", record.id)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Zapisywanie..." : "Zapisz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
