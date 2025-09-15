// ================================
// path: src/pages/admin/maintenances/create.tsx
// ================================
import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Textarea, Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import { SubPage } from "@/components/layout";
import { LookupSelect } from "@/components/form/LookupSelect";
import { ASSET_TYPES, MAINT_TYPES } from "./shared";
import { RES } from "./index";

export const MaintenancesCreate = () => {
  const { list } = useNavigation();
  const location = useLocation();

  const {
    refineCore: { onFinish },
    register, handleSubmit, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm({ refineCoreProps: { resource: RES } });

  React.useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const asset_type = qs.get("asset_type");
    const asset_id = qs.get("asset_id");
    const type = qs.get("type");
    const title = qs.get("title");
    if (asset_type) setValue("asset_type", asset_type, { shouldValidate: true });
    if (asset_id) setValue("asset_id", Number(asset_id), { shouldValidate: true });
    if (type) setValue("type", type, { shouldValidate: true });
    if (title) setValue("title", title, { shouldValidate: false });
  }, [location.search, setValue]);

  const onAssetType = (v: string) => {
    setValue("asset_type", v, { shouldValidate: true });
    setValue("asset_id", undefined);
  };

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list(RES)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox><Lead title="Nowy wpis serwisowy" description="Termin/wykonanie dla zasobu" /></FlexBox>

      <Card>
        <CardHeader><CardTitle>Parametry</CardTitle></CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onFinish)}>
            <input type="hidden" {...register("type", { required: "Wymagane" })} />
            <input type="hidden" {...register("asset_type", { required: "Wymagane" })} />
            <input type="hidden" {...register("asset_id", { required: "Wymagane" })} />

            <FormControl label="Tytuł" htmlFor="title" error={errors.title?.message as string} required>
              <Input id="title" {...register("title", { required: "Wymagane" })} />
            </FormControl>

            <GridBox variant="1-2-2">
              <FormControl label="Typ" required error={errors.type?.message as string}>
                <Select defaultValue={watch("type")} onValueChange={(v) => setValue("type", v, { shouldValidate: true })}>
                  <SelectTrigger><SelectValue placeholder="Wybierz typ" /></SelectTrigger>
                  <SelectContent>{MAINT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </FormControl>

              <FormControl label="Oddział (opcjonalnie)">
                <LookupSelect
                  resource="branches"
                  value={watch("branch_id")}
                  onChange={(v) => setValue("branch_id", Number(v))}
                  renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                  placeholder="Globalny lub przypisany do oddziału"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Zasób – typ" required error={errors.asset_type?.message as string}>
                <Select defaultValue={watch("asset_type")} onValueChange={onAssetType}>
                  <SelectTrigger><SelectValue placeholder="Wybierz zasób" /></SelectTrigger>
                  <SelectContent>{ASSET_TYPES.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                </Select>
              </FormControl>

              <FormControl label="Zasób – ID" required error={errors.asset_id?.message as string}>
                <LookupSelect
                  resource={
                    watch("asset_type") === "vehicle"   ? "vehicles"   :
                    watch("asset_type") === "container" ? "containers" :
                    "yard_equipment"
                  }
                  value={watch("asset_id")}
                  onChange={(v) => setValue("asset_id", Number(v), { shouldValidate: true })}
                  renderLabel={(x: any) => `${x.name || x.code} (#${x.id})`}
                  placeholder="Wybierz zasób po typie"
                />
              </FormControl>
            </GridBox>

            <GridBox variant="1-2-2">
              <FormControl label="Termin (due_at)" htmlFor="due_at">
                <Input id="due_at" type="date" {...register("due_at")} />
              </FormControl>
              <FormControl label="Wykonano (completed_at)" htmlFor="completed_at">
                <Input id="completed_at" type="date" {...register("completed_at")} />
              </FormControl>
            </GridBox>

            <FormControl label="Notatki">
              <Textarea rows={3} {...register("notes")} />
            </FormControl>

            <FormActions>
              <Button type="button" variant="outline" onClick={() => list(RES)}>Anuluj</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Tworzenie..." : "Utwórz"}</Button>
            </FormActions>
          </Form>
        </CardContent>
      </Card>
    </SubPage>
  );
};

export default MaintenancesCreate;
