// ================================
// path: src/pages/admin/tasks/create.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation, useGetIdentity } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Textarea } from "@/components/ui";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";

const TYPES = ["transport", "plac"];
const STATUSES = ["nowe", "w_realizacji", "zakonczone", "anulowane"];

export const TasksCreate = () => {
  const { list } = useNavigation();
  const { data: me } = useGetIdentity<{ id: string }>();
  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "tasks" } });

  const submit = (values: any) => onFinish({ ...values, created_by: me?.id });

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("tasks")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title="Nowe zadanie" description="Utwórz nowe zadanie" />
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(submit)}>
            <GridBox variant="1-2-2">
              <FormControl label="Tytuł" htmlFor="title" error={errors.title?.message as string} required>
                <Input id="title" {...register("title", { required: "Wymagane" })} />
              </FormControl>

              <FormControl label="Typ" error={errors.type?.message as string} required>
                <Select onValueChange={(v) => setValue("type", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz typ" /></SelectTrigger>
                  <SelectContent>
                    {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
                <Select defaultValue="nowe" onValueChange={(v) => setValue("status", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz status" /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
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
              <FormControl label="Kierowca (UUID)" htmlFor="assigned_driver">
                <Input id="assigned_driver" {...register("assigned_driver")} />
              </FormControl>
              <FormControl label="Pojazd (assigned_vehicle_id)" htmlFor="assigned_vehicle_id">
                <Input id="assigned_vehicle_id" type="number" {...register("assigned_vehicle_id", { valueAsNumber: true })} />
              </FormControl>
              <FormControl label="Kontener (assigned_container_id)" htmlFor="assigned_container_id">
                <Input id="assigned_container_id" type="number" {...register("assigned_container_id", { valueAsNumber: true })} />
              </FormControl>
            </GridBox>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => list("tasks")}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting || !me?.id}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
