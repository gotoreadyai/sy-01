// ================================
// path: src/pages/admin/addresses/create.tsx
// (obsługa ?client=&kind=&return= + redirect:false + errMsg)
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation, useCreate } from "@refinedev/core";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Textarea } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import * as React from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type AddressFormValues = {
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

export const AddressesCreate: React.FC = () => {
  const { list } = useNavigation();
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const clientIdQP = sp.get("client");
  const kindQP = sp.get("kind") || "Siedziba";
  const returnQP = sp.get("return");

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormValues>({
    refineCoreProps: {
      resource: "addresses",
      redirect: false, // kontrolujemy nawigację sami
    },
    defaultValues: { country: "PL" },
  });

  const { mutate: createLink } = useCreate();

  const onSubmit = handleSubmit(async (values) => {
    const res: any = await onFinish(values);
    const newId = res?.data?.id ?? res?.id ?? undefined;

    if (newId && clientIdQP) {
      await new Promise<void>((resolve) =>
        createLink(
          {
            resource: "client_addresses",
            values: {
              client_id: Number(clientIdQP),
              address_id: Number(newId),
              kind: kindQP || null,
            },
          },
          { onSuccess: () => resolve() },
        ),
      );
    }

    if (returnQP) {
      nav(returnQP, { replace: true });
      return;
    }
    list("addresses");
  });

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("addresses")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead
          title="Nowy adres"
          description={
            clientIdQP
              ? `Po zapisaniu adres zostanie przypięty do klienta #${clientIdQP} (etykieta: ${kindQP}).`
              : "Dodaj adres do bazy"
          }
        />
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={onSubmit}>
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
              <Button type="button" variant="outline" onClick={() => list("addresses")}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
