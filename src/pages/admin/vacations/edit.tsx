// ================================
// path: src/pages/admin/vacations/edit.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { LookupSelect } from "@/components/form/LookupSelect";

const STATUSES = ["zgloszony", "zaakceptowany", "odrzucony"] as const;

export const VacationsEdit = () => {
  const { show } = useNavigation();

  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    refineCoreProps: { resource: "vacations", action: "edit" },
  });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("vacations", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox>
        <Lead title="Edycja wniosku urlopowego" description={`ID: #${record.id}`} />
      </FlexBox>

      <Card>
        <CardHeader>
          <CardTitle>Parametry</CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Użytkownik">
                <LookupSelect
                  resource="users"
                  value={watch("user_id") ?? record.user_id}
                  onChange={(v) => setValue("user_id", v)}
                  renderLabel={(u: any) =>
                    `${u.full_name || u.email} (#${String(u.id).slice(0, 8)})`
                  }
                  placeholder="Wybierz użytkownika"
                />
              </FormControl>

              <FormControl label="Oddział (opcjonalnie)">
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id") ?? record.branch_id}
                  onChange={(v) => setValue("branch_id", Number(v))}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Wybierz oddział"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Data od" htmlFor="start_date" required>
                <Input
                  id="start_date"
                  type="date"
                  defaultValue={record.start_date}
                  {...register("start_date", { required: "Wymagane" })}
                />
              </FormControl>

              <FormControl label="Data do" htmlFor="end_date" required>
                <Input
                  id="end_date"
                  type="date"
                  defaultValue={record.end_date}
                  {...register("end_date", { required: "Wymagane" })}
                />
              </FormControl>
            </GridBox>

            <FormControl label="Status">
              <Select defaultValue={record.status} onValueChange={(v) => setValue("status", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormControl label="Uwagi">
              <Textarea rows={3} defaultValue={record.notes ?? ""} {...register("notes")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show("vacations", record.id)}>
                Anuluj
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Zapisywanie..." : "Zapisz"}
              </Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
