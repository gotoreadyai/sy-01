// ================================
// path: src/pages/admin/users/edit.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { RolesEditor } from "./RolesEditor";

export const UsersEdit = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register, handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "users", action: "edit" } });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("users", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox>
        <Lead title="Edycja użytkownika" description={record.email} />
      </FlexBox>

      <div className="grid gap-4">
        <Card>
          <CardHeader><CardTitle>Dane podstawowe</CardTitle></CardHeader>
          <CardContent>
            <Form onSubmit={handleSubmit(onFinish)}>
              <FormControl label="Imię i nazwisko" htmlFor="full_name">
                <Input id="full_name" {...register("full_name")} />
              </FormControl>
              <FormControl label="Telefon" htmlFor="phone">
                <Input id="phone" {...register("phone")} />
              </FormControl>

              <FormActions>
                <Button type="button" variant="outline" onClick={() => show("users", record.id)}>Anuluj</Button>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Zapisywanie..." : "Zapisz"}</Button>
              </FormActions>
            </Form>
          </CardContent>
        </Card>

        <RolesEditor userId={record.id} />
      </div>
    </SubPage>
  );
};
