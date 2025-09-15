// ================================
// path: src/pages/admin/hauls/edit.tsx
// ================================
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

const HAULS_TABLE = "dispatches";
const STATUSES = ["plan", "w_drodze", "zaladowany", "rozladowany", "zakonczony", "anulowany"] as const;

export const HaulsEdit = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register, handleSubmit, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "dispatches", action: "edit", meta: { table: HAULS_TABLE } } });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("dispatches", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox><Lead title="Edycja wywozu" description={`ID: #${record.id}`} /></FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Tytuł" htmlFor="title" error={errors.title?.message as string} required>
                <Input id="title" defaultValue={record.title} {...register("title", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Oddział (branch_id)" required error={errors.branch_id?.message as string}>
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id") ?? record.branch_id}
                  onChange={(v) => setValue("branch_id", Number(v), { shouldValidate: true })}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Wybierz oddział"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Status" required>
                <Select defaultValue={record.status} onValueChange={(v) => setValue("status", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz status" /></SelectTrigger>
                  <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </FormControl>
              <FormControl label="Start" htmlFor="start_at" required>
                <Input id="start_at" type="datetime-local" defaultValue={record.start_at?.slice(0,16)} {...register("start_at", { required: "Wymagane" })} />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Koniec" htmlFor="end_at">
                <Input id="end_at" type="datetime-local" defaultValue={record.end_at?.slice(0,16)} {...register("end_at")} />
              </FormControl>
              <div />
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Kierowca">
                <LookupSelect
                  resource="users"
                  value={watch("driver_id") ?? record.driver_id}
                  onChange={(v) => setValue("driver_id", v)}
                  renderLabel={(u: any) => `${u.full_name || u.email} (#${String(u.id).slice(0,8)})`}
                  placeholder="Wybierz kierowcę (opcjonalnie)"
                />
              </FormControl>
              <FormControl label="Pojazd">
                <LookupSelect
                  resource="vehicles"
                  value={watch("vehicle_id") ?? record.vehicle_id}
                  onChange={(v) => setValue("vehicle_id", Number(v))}
                  renderLabel={(vv: any) => `${vv.name}${vv.reg_plate ? " / " + vv.reg_plate : ""} (#${vv.id})`}
                  placeholder="Wybierz pojazd (opcjonalnie)"
                />
              </FormControl>
              <FormControl label="Naczepa / przyczepa">
                <LookupSelect
                  resource="vehicles"
                  value={watch("trailer_id") ?? record.trailer_id}
                  onChange={(v) => setValue("trailer_id", Number(v))}
                  renderLabel={(tt: any) => `${tt.name}${tt.reg_plate ? " / " + tt.reg_plate : ""} (#${tt.id})`}
                  placeholder="Wybierz naczepę (opcjonalnie)"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Transport zewnętrzny (CRM: Firmy transportowe)">
                <LookupSelect
                  resource="clients"
                  value={watch("external_transport_client_id") ?? record.external_transport_client_id}
                  onChange={(v) => setValue("external_transport_client_id", Number(v))}
                  renderLabel={(c: any) => `${c.name}${c.category ? " — " + c.category : ""} (#${c.id})`}
                  placeholder="Wybierz firmę (opcjonalnie)"
                />
              </FormControl>
              <FormControl label="Stawka za fracht">
                <Input type="number" step="0.01" defaultValue={record.freight_rate ?? undefined} {...register("freight_rate", { valueAsNumber: true })} />
              </FormControl>
              <FormControl label="Waluta">
                <Input maxLength={3} defaultValue={record.freight_currency ?? "PLN"} {...register("freight_currency")} />
              </FormControl>
            </GridBox>

            <FormControl label="Notatki">
              <Textarea rows={4} defaultValue={record.notes ?? ""} {...register("notes")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show("dispatches", record.id)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Zapisywanie..." : "Zapisz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
