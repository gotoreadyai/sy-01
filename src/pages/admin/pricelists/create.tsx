// ================================
// path: src/pages/admin/pricelists/create.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useGetIdentity, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Textarea } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { LookupSelect } from "@/components/form/LookupSelect";

export const PricelistsCreate = () => {
  const { list } = useNavigation();
  const { data: me } = useGetIdentity<{ id: string }>();
  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: "price_lists" } });

  const submit = (values: any) => onFinish({ ...values, created_by: me?.id });

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("price_lists")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title="Nowa wersja cennika" description="Utwórz cennik (rich-text)" />
      </FlexBox>

      <Card>
        <CardHeader>
          <CardTitle>Parametry</CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(submit)}>
            <GridBox variant="1-2-2">
              <FormControl label="Nazwa" htmlFor="title" error={errors.title?.message as string} required>
                <Input id="title" {...register("title", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Oddział (opcjonalnie)">
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id")}
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

            {/* Rich-text w I etapie jako textarea (można podmienić na RTE) */}
            <FormControl label="Treść cennika (rich-text)" error={errors.content_rich?.message as string} required>
              <Textarea
                rows={10}
                {...register("content_rich", { required: "Wymagane" })}
                placeholder="Wklej/napisz treść cennika. Obsługa RTE do podmiany w kolejnym kroku."
              />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => list("price_lists")}>
                Anuluj
              </Button>
              <Button type="submit" disabled={isSubmitting || !me?.id}>
                {isSubmitting ? "Tworzenie..." : "Utwórz"}
              </Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
