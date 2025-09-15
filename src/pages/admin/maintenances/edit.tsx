// ================================
// path: src/pages/admin/maintenances/edit.tsx
// ================================
import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Textarea, Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { LookupSelect } from "@/components/form/LookupSelect";
import { RES_LIST, RES_WRITE } from "./index";
import { SERVICE_KINDS } from "./shared";

export const MaintenancesEdit = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register, handleSubmit, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: RES_WRITE, action: "edit" } });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;
  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show(RES_LIST, record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox><Lead title="Edycja wpisu serwisowego" description={`SID: #${record.id}`} /></FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Zasób (assets)" required error={errors.asset_id?.message as string}>
                <LookupSelect
                  resource="assets"
                  value={watch("asset_id") ?? record.asset_id}
                  onChange={(v) => setValue("asset_id", Number(v), { shouldValidate: true })}
                  renderLabel={(x: any) => `${x.label} [${x.kind}] (#${x.id})`}
                  placeholder="Wybierz zasób"
                />
              </FormControl>

              <FormControl label="Typ serwisu" required error={errors.kind?.message as string}>
                <Select defaultValue={record.kind} onValueChange={(v) => setValue("kind", v, { shouldValidate: true })}>
                  <SelectTrigger><SelectValue placeholder="Wybierz typ" /></SelectTrigger>
                  <SelectContent>{SERVICE_KINDS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Termin (due_at)" htmlFor="due_at">
                <Input id="due_at" type="date" {...register("due_at")} />
              </FormControl>
              <FormControl label="Wykonano (done_at)" htmlFor="done_at">
                <Input id="done_at" type="date" {...register("done_at")} />
              </FormControl>
            </GridBox>

            <FormControl label="Notatki">
              <Textarea rows={3} {...register("notes")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show(RES_LIST, record.id)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Zapisywanie..." : "Zapisz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};

export default MaintenancesEdit;
