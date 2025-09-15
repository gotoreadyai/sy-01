
// ================================
// path: src/pages/admin/pricelists/edit.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Textarea } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { useLoading } from "@/utility";
import { LookupSelect } from "@/components/form/LookupSelect";

export const PricelistsEdit = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "price_lists", action: "edit" } });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as any | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("price_lists", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox>
        <Lead title="Edycja cennika" description={`ID: #${record.id}`} />
      </FlexBox>

      <Card>
        <CardHeader>
          <CardTitle>Parametry</CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Nazwa" htmlFor="title" error={errors.title?.message as string} required>
                <Input id="title" {...register("title", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Oddział (opcjonalnie)">
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id") ?? record.branch_id}
                  onChange={(v) => setValue("branch_id", v ? Number(v) : null)}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Globalny lub przypisany do oddziału"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Etykieta wersji" htmlFor="version_tag">
                <Input id="version_tag" {...register("version_tag")} />
              </FormControl>
            </GridBox>

            <FormControl label="Treść cennika (rich-text)" error={errors.content_rich?.message as string} required>
              <Textarea rows={10} {...register("content_rich", { required: "Wymagane" })} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show("price_lists", record.id)}>
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
