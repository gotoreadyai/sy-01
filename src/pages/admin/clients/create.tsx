// ================================
// path: src/pages/admin/clients/create.tsx
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
import { LookupSelect } from "@/components/form/LookupSelect";

const SECTIONS = ["zakupy", "sprzedaz", "firmy_transportowe", "inne"];

export const ClientsCreate = () => {
  const { list } = useNavigation();
  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "clients" } });

  const onBranch = (v: string) => setValue("branch_id", Number(v));

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("clients")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title="Nowy klient" description="Dodaj klienta" />
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Nazwa" htmlFor="name" error={errors.name?.message as string} required>
                <Input id="name" {...register("name", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Sekcja" required>
                <Select onValueChange={(v) => setValue("section", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz sekcję" /></SelectTrigger>
                  <SelectContent>
                    {SECTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Kategoria" htmlFor="category">
                <Input id="category" {...register("category")} />
              </FormControl>
              <FormControl label="Oddział (branch_id)" htmlFor="branch_id">
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id")}
                  onChange={onBranch}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Wybierz oddział (opcjonalnie)"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Telefon" htmlFor="phone">
                <Input id="phone" {...register("phone")} />
              </FormControl>
              <FormControl label="Email" htmlFor="email">
                <Input id="email" type="email" {...register("email")} />
              </FormControl>
              <FormControl label="WWW" htmlFor="website">
                <Input id="website" type="url" {...register("website")} />
              </FormControl>
            </GridBox>

            <FormControl label="Opis">
              <Textarea rows={3} {...register("description")} />
            </FormControl>

            <FormControl label="Archiwum">
              <input type="checkbox" {...register("is_archived")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => list("clients")}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
