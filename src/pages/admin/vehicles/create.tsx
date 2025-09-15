// ================================
// path: src/pages/vehicles/create.tsx
// ================================
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input } from "@/components/ui";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";

const TYPES = ["ciezarowe","osobowe","przyczepa","naczepa"];

export const VehiclesCreate = () => {
  const { list } = useNavigation();
  const { refineCore: { onFinish }, register, handleSubmit, setValue, formState: { errors, isSubmitting } } =
    useForm({ refineCoreProps: { resource: "vehicles" } });

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("vehicles")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title="Nowy pojazd" description="Dodaj pojazd" />
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <GridBox variant="1-2-2">
              <FormControl label="Nazwa" htmlFor="name" error={errors.name?.message as string} required>
                <Input id="name" {...register("name", { required: "Wymagane" })} />
              </FormControl>
              <FormControl label="Typ" required>
                <Select onValueChange={(v) => setValue("type", v)}>
                  <SelectTrigger><SelectValue placeholder="Wybierz typ" /></SelectTrigger>
                  <SelectContent>
                    {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Oddział (branch_id)" htmlFor="branch_id" required>
                <Input id="branch_id" type="number" {...register("branch_id", { required: "Wymagane", valueAsNumber: true })} />
              </FormControl>
              <FormControl label="Tablica rejestracyjna" htmlFor="reg_plate">
                <Input id="reg_plate" {...register("reg_plate")} />
              </FormControl>
            </GridBox>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => list("vehicles")}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};
