// ================================
// path: src/pages/admin/addresses/edit.tsx
// (errMsg dla error prop)
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
import * as React from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type Address = {
  id: number;
  line1: string;
  line2?: string | null;
  postal_code?: string | null;
  city?: string | null;
  country?: string | null;
  notes?: string | null;
  lat?: number | null;
  lng?: number | null;
  geofence_radius_m?: number | null;
};

const errMsg = (
  e?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
): string | undefined => e?.message as string | undefined;

export const AddressesEdit: React.FC = () => {
  const { show } = useNavigation();
  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Address>({ refineCoreProps: { resource: "addresses", action: "edit" } });

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data as Address | undefined;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => show("addresses", record.id)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do szczegółów
      </Button>

      <FlexBox>
        <Lead title="Edycja adresu" description={`ID: #${record.id}`} />
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Adres (linia 1)" htmlFor="line1" error={errMsg(errors.line1)} required>
                <Input id="line1" {...register("line1", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Adres (linia 2)" htmlFor="line2">
                <Input id="line2" {...register("line2")} />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Kod pocztowy" htmlFor="postal_code">
                <Input id="postal_code" {...register("postal_code")} />
              </FormControl>
              <FormControl label="Miasto" htmlFor="city">
                <Input id="city" {...register("city")} />
              </FormControl>
              <FormControl label="Kraj" htmlFor="country">
                <Input id="country" {...register("country")} />
              </FormControl>
            </GridBox>

            <FormControl label="Notatki" htmlFor="notes">
              <Textarea id="notes" rows={2} {...register("notes")} />
            </FormControl>

            <GridBox variant="1-2-2">
              <FormControl label="Szer. geogr. (lat)" htmlFor="lat">
                <Input id="lat" type="number" step="any" {...register("lat", { valueAsNumber: true })} />
              </FormControl>
              <FormControl label="Dł. geogr. (lng)" htmlFor="lng">
                <Input id="lng" type="number" step="any" {...register("lng", { valueAsNumber: true })} />
              </FormControl>
              <FormControl label="Promień geofencingu (m)" htmlFor="geo">
                <Input id="geo" type="number" {...register("geofence_radius_m", { valueAsNumber: true })} />
              </FormControl>
            </GridBox>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => show("addresses", record.id)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Zapisywanie..." : "Zapisz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
