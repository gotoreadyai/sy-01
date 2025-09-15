// ================================
// path: src/pages/admin/users/create.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation, useTable } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";

export const UsersCreate = () => {
  const { list } = useNavigation();
  const {
    refineCore: { onFinish },
    register, handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "users" } });

  // Insert przez VIEW `users` – zakładamy regułę INSTEAD OF INSERT,
  // tworzymy konto z profilem; role przypisujemy w edytorze ról po zapisie.
  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("users")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title="Nowy użytkownik" description="Załóż konto (role dodasz po zapisaniu)" />
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Dane podstawowe</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <FormControl label="E-mail" htmlFor="email" error={errors.email?.message as string} required>
              <Input id="email" type="email" {...register("email", { required: "Wymagane" })} />
            </FormControl>
            <FormControl label="Imię i nazwisko" htmlFor="full_name">
              <Input id="full_name" {...register("full_name")} />
            </FormControl>
            <FormControl label="Telefon" htmlFor="phone">
              <Input id="phone" {...register("phone")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => list("users")}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
