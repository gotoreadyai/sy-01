// ================================
// path: src/pages/admin/vacations/create.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation, useGetIdentity } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Select, SelectTrigger, SelectContent, SelectItem, SelectValue, Textarea } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { LookupSelect } from "@/components/form/LookupSelect";
import { RES } from "./index";

const STATUSES = ["zgloszony", "zaakceptowany", "odrzucony"] as const;

export const VacationsCreate = () => {
  const { list } = useNavigation();
  const { data: me } = useGetIdentity<{ id: string, email: string }>();
  const { refineCore: { onFinish }, register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } =
    useForm({ refineCoreProps: { resource: RES } });

  const submit = (values: any) => onFinish({ ...values, user_id: values.user_id ?? me?.id, user_email: values.user_email ?? me?.email });

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list(RES)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox><Lead title="Nowy wniosek urlopowy" description="Utwórz wniosek" /></FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(submit)}>
            <GridBox variant="1-2-2">
              <FormControl label="Użytkownik">
                <LookupSelect
                  resource="users"
                  value={watch("user_id")}
                  onChange={(v) => setValue("user_id", v)}
                  renderLabel={(u: any) => `${u.full_name || u.email} (#${String(u.id).slice(0,8)})`}
                  placeholder="Wybierz użytkownika (opcjonalnie – domyślnie: ja)"
                />
              </FormControl>
              <FormControl label="Oddział (opcjonalnie)">
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id")}
                  onChange={(v) => setValue("branch_id", Number(v))}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Wybierz oddział"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Data od" htmlFor="start_date" required>
                <Input id="start_date" type="date" {...register("start_date", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Data do" htmlFor="end_date" required>
                <Input id="end_date" type="date" {...register("end_date", { required: "Wymagane" })} />
              </FormControl>
            </GridBox>

            <FormControl label="Status (domyślnie: zgłoszony)">
              <Select defaultValue="zgloszony" onValueChange={(v) => setValue("status", v)}>
                <SelectTrigger><SelectValue placeholder="Wybierz status" /></SelectTrigger>
                <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </FormControl>

            <FormControl label="Uwagi">
              <Textarea rows={3} {...register("notes")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => list(RES)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting || !me?.id}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
