// ================================
// path: src/pages/admin/branches/create.tsx
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

export const BranchesCreate = () => {
  const { list } = useNavigation();
  const { refineCore: { onFinish }, register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ refineCoreProps: { resource: "branches" } });

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("branches")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title="Nowy oddział" description="Dodaj placówkę" />
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
              <Button type="button" variant="outline" onClick={() => list("branches")}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
