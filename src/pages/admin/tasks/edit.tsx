// ================================
// path: src/pages/admin/tasks/edit.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Textarea } from "@/components/ui";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { LookupSelect } from "@/components/form/LookupSelect";

const TYPES = ["transport", "plac"];
const STATUSES = ["nowe", "w_realizacji", "zakonczone", "anulowane"];

export const TasksEdit = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "tasks", action: "edit" } });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  const onBranch = (v: string) => setValue("branch_id", Number(v), { shouldValidate: true });
  const onVehicle = (v: string) => setValue("assigned_vehicle_id", Number(v));
  const onContainer = (v: string) => setValue("assigned_container_id", Number(v));
  const onDriver = (v: string) => setValue("assigned_driver", v);

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("tasks", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox>
        <Lead title="Edycja zadania" description={`ID: #${String(record.id).slice(0, 8)}`} />
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Tytuł" htmlFor="title" error={errors.title?.message as string} required>
                <Input id="title" {...register("title", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Typ" required>
                <Select defaultValue={record.type} onValueChange={(v) => setValue("type", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz typ" /></SelectTrigger>
                  <SelectContent>
                    {TYPES.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                  </SelectContent>
                </Select>
              </FormControl>
            </GridBox>

            <FormControl label="Opis">
              <Textarea rows={3} {...register("description")} />
            </FormControl>

            <GridBox variant="1-2-2">
              <FormControl label="Oddział (branch_id)" required error={errors.branch_id?.message as string}>
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id") ?? record.branch_id}
                  onChange={onBranch}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Wybierz oddział"
                />
              </FormControl>
              <FormControl label="Status" required>
                <Select defaultValue={record.status} onValueChange={(v) => setValue("status", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz status" /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                  </SelectContent>
                </Select>
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Start (start_at)" htmlFor="start_at" required>
                <Input id="start_at" type="datetime-local" {...register("start_at", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Koniec (end_at)" htmlFor="end_at">
                <Input id="end_at" type="datetime-local" {...register("end_at")} />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Kierowca (UUID)">
                <LookupSelect
                  resource="users"
                  value={watch("assigned_driver") ?? record.assigned_driver}
                  onChange={onDriver}
                  renderLabel={(u: any) => `${u.full_name || u.email} (#${String(u.id).slice(0, 8)})`}
                  placeholder="Wybierz kierowcę (opcjonalnie)"
                />
              </FormControl>
              <FormControl label="Pojazd (assigned_vehicle_id)">
                <LookupSelect
                  resource="vehicles"
                  value={watch("assigned_vehicle_id") ?? record.assigned_vehicle_id}
                  onChange={onVehicle}
                  renderLabel={(v: any) => `${v.name}${v.reg_plate ? " / " + v.reg_plate : ""} (#${v.id})`}
                  placeholder="Wybierz pojazd (opcjonalnie)"
                />
              </FormControl>
              <FormControl label="Kontener (assigned_container_id)">
                <LookupSelect
                  resource="containers"
                  value={watch("assigned_container_id") ?? record.assigned_container_id}
                  onChange={onContainer}
                  renderLabel={(c: any) => `${c.code} [${c.status}]${c.category ? " / " + c.category : ""} (#${c.id})`}
                  placeholder="Wybierz kontener (opcjonalnie)"
                />
              </FormControl>
            </GridBox>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show("tasks", record.id)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Zapisywanie..." : "Zapisz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
