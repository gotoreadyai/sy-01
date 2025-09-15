// ================================
// path: src/pages/admin/containers/create.tsx
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
import { LookupSelect } from "@/components/form/LookupSelect";

const STATUSES = ["na_placu", "u_klienta", "na_pojezdzie", "serwis", "inne"] as const;

export const ContainersCreate = () => {
  const { list } = useNavigation();
  const {
    refineCore: { onFinish },
    register, handleSubmit, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "containers" } });

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("containers")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox><Lead title="Nowy kontener" description="Dodaj kontener" /></FlexBox>

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
                  value={watch("branch_id")}
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
              <Select onValueChange={(v) => setValue("status", v)}>
                <SelectTrigger><SelectValue placeholder="Wybierz status" /></SelectTrigger>
                <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </FormControl>

            <FormControl label="Archiwum">
              <input type="checkbox" {...register("is_archived")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => list("containers")}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
