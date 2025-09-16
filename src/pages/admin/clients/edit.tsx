// ================================
// path: src/pages/admin/clients/edit.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Textarea, Badge } from "@/components/ui";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { LookupSelect } from "@/components/form/LookupSelect";
import * as React from "react";

const SECTIONS = ["zakupy", "sprzedaz", "firmy_transportowe", "inne"] as const;
const CATEGORIES = [
  "skupy złomu",
  "autokasacja",
  "zakład produkcyjny",
  "spalarnia",
  "huta",
  "port",
  "pośrednik",
  "kontenery",
  "odlewnia",
  "inne",
];

export const ClientsEdit: React.FC = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "clients", action: "edit" } });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  const onBranch = (v: string) => setValue("branch_id", Number(v));
  const onOwner = (v: string) => setValue("account_owner", v);

  const emailRegister = register("email", {
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Nieprawidłowy adres e-mail",
    },
  });
  const urlRegister = register("website", {
    pattern: {
      value: /^https?:\/\/.+$/i,
      message: "URL musi zaczynać się od http(s)://",
    },
  });
  const phoneRegister = register("phone", {
    value: record.phone,
    pattern: { value: /^[\d+\-\s()]{5,}$/, message: "Nieprawidłowy numer telefonu" },
  });

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("clients", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox>
        <Lead
          title="Edycja klienta"
          description={
            <span className="inline-flex items-center gap-2">
              ID: #{record.id} <Badge variant="secondary">CRM</Badge>
            </span>
          }
        />
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
                <Select defaultValue={record.section} onValueChange={(v) => setValue("section", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz sekcję" /></SelectTrigger>
                  <SelectContent>
                    {SECTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Kategoria" htmlFor="category">
                <Select defaultValue={record.category ?? undefined} onValueChange={(v) => setValue("category", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz kategorię (opcjonalnie)" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input id="category" className="mt-2" placeholder="...lub wpisz własną" {...register("category")} />
              </FormControl>

              <FormControl label="Oddział (branch_id)" htmlFor="branch_id">
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id") ?? record.branch_id}
                  onChange={onBranch}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Wybierz oddział (opcjonalnie)"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Opiekun (account_owner)" htmlFor="account_owner">
                <LookupSelect
                  resource="users"
                  value={watch("account_owner") ?? record.account_owner}
                  onChange={onOwner}
                  renderLabel={(u: any) => `${u.full_name} <${u.email}>`}
                  placeholder="Wybierz opiekuna (opcjonalnie)"
                />
              </FormControl>
              <div />
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Telefon" htmlFor="phone" error={errors.phone?.message as string}>
                <Input id="phone" {...phoneRegister} />
              </FormControl>
              <FormControl label="Email" htmlFor="email" error={errors.email?.message as string}>
                <Input id="email" type="email" {...emailRegister} />
              </FormControl>
              <FormControl label="WWW" htmlFor="website" error={errors.website?.message as string}>
                <Input id="website" type="url" {...urlRegister} />
              </FormControl>
            </GridBox>

            <FormControl label="Opis">
              <Textarea rows={3} {...register("description")} />
            </FormControl>

            <FormControl label="Archiwum">
              <input type="checkbox" {...register("is_archived")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show("clients", record.id)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Zapisywanie..." : "Zapisz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
