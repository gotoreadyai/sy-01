// ================================
// path: src/pages/admin/branches/edit.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";

export const BranchesEdit = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "branches", action: "edit" } });

  // ✅ bezpieczne wydobycie z możliwego `undefined`
  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("branches", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox>
        <Lead title="Edycja oddziału" description={`ID: #${record.id}`} />
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Nazwa" htmlFor="name" error={errors.name?.message as string} required>
                <Input id="name" {...register("name", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Miasto" htmlFor="city">
                <Input id="city" {...register("city")} />
              </FormControl>
            </GridBox>

            <FormControl label="Archiwum">
              <input type="checkbox" {...register("is_archived")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show("branches", record.id)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Zapisywanie..." : "Zapisz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
