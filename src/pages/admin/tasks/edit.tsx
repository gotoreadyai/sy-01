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

const TYPES = ["transport", "plac"];
const STATUSES = ["nowe", "w_realizacji", "zakonczone", "anulowane"];

export const TasksEdit = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "tasks", action: "edit" } });

  // ✅ bezpieczne wartości
  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

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
              <FormControl label="Oddział (branch_id)" htmlFor="branch_id" required>
                <Input id="branch_id" type="number" {...register("branch_id", { required: "Wymagane", valueAsNumber: true })} />
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
                <Input {...register("assigned_driver")} />
              </FormControl>
              <FormControl label="Pojazd (assigned_vehicle_id)">
                <Input type="number" {...register("assigned_vehicle_id", { valueAsNumber: true })} />
              </FormControl>
              <FormControl label="Kontener (assigned_container_id)">
                <Input type="number" {...register("assigned_container_id", { valueAsNumber: true })} />
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
