// ================================
// path: src/pages/admin/hauls/create.tsx
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
import { LookupSelect } from "@/components/form/LookupSelect";

const HAULS_TABLE = "dispatches";
const STATUSES = ["plan", "w_drodze", "zaladowany", "rozladowany", "zakonczony", "anulowany"] as const;

export const HaulsCreate = () => {
  const { list } = useNavigation();
  const { refineCore: { onFinish }, register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } =
    useForm({ refineCoreProps: { resource: "dispatches", meta: { table: HAULS_TABLE } } });

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("dispatches")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox><Lead title="Nowy wywóz" description="Trasa wielopunktowa + zasoby" /></FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Tytuł" htmlFor="title" error={errors.title?.message as string} required>
                <Input id="title" {...register("title", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Oddział (branch_id)" required error={errors.branch_id?.message as string}>
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id")}
                  onChange={(v) => setValue("branch_id", Number(v), { shouldValidate: true })}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Wybierz oddział"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Status" required>
                <Select defaultValue="plan" onValueChange={(v) => setValue("status", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz status" /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormControl label="Start" htmlFor="start_at" required>
                <Input id="start_at" type="datetime-local" {...register("start_at", { required: "Wymagane" })} />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Koniec" htmlFor="end_at">
                <Input id="end_at" type="datetime-local" {...register("end_at")} />
              </FormControl>
              <div />
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Kierowca">
                <LookupSelect
                  resource="users"
                  value={watch("driver_id")}
                  onChange={(v) => setValue("driver_id", v)}
                  renderLabel={(u: any) => `${u.full_name || u.email} (#${String(u.id).slice(0,8)})`}
                  placeholder="Wybierz kierowcę (opcjonalnie)"
                />
              </FormControl>
              <FormControl label="Pojazd">
                <LookupSelect
                  resource="vehicles"
                  value={watch("vehicle_id")}
                  onChange={(v) => setValue("vehicle_id", Number(v))}
                  renderLabel={(vv: any) => `${vv.name}${vv.reg_plate ? " / " + vv.reg_plate : ""} (#${vv.id})`}
                  placeholder="Wybierz pojazd (opcjonalnie)"
                />
              </FormControl>
              <FormControl label="Naczepa / przyczepa">
                <LookupSelect
                  resource="vehicles"
                  value={watch("trailer_id")}
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
                  value={watch("external_transport_client_id")}
                  onChange={(v) => setValue("external_transport_client_id", Number(v))}
                  renderLabel={(c: any) => `${c.name}${c.category ? " — " + c.category : ""} (#${c.id})`}
                  placeholder="Wybierz firmę (opcjonalnie)"
                />
              </FormControl>
              <FormControl label="Stawka za fracht">
                <Input type="number" step="0.01" {...register("freight_rate", { valueAsNumber: true })} />
              </FormControl>
              <FormControl label="Waluta">
                <Input maxLength={3} defaultValue="PLN" {...register("freight_currency")} />
              </FormControl>
            </GridBox>

            <FormControl label="Notatki">
              <Textarea rows={4} {...register("notes")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => list("dispatches")}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
