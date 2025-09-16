// ================================
// path: src/pages/admin/clients/create.tsx
// (krok 2: zamiast dwóch guzików — pole "etykieta" + 1 przycisk)
// ================================
import * as React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation, useList, useMany } from "@refinedev/core";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Input, Textarea, Badge, Separator } from "@/components/ui";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormActions, FormControl } from "@/components/form";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { SubPage } from "@/components/layout";
import { LookupSelect } from "@/components/form/LookupSelect";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ClientAddressLinker } from "./ClientAddressLinker";

const SECTIONS = ["zakupy", "sprzedaz", "firmy_transportowe", "inne"] as const;
type Section = typeof SECTIONS[number];

type ClientFormValues = {
  name: string;
  section?: Section;
  category?: string | null;
  branch_id?: number | null;
  account_owner?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  description?: string | null;
  is_archived: boolean;
};

const errMsg = (
  e?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
): string | undefined => e?.message as string | undefined;

type ClientAddress = { id: number; client_id: number; address_id: number; kind?: string | null };
type Address = { id: number; line1: string; line2?: string | null; postal_code?: string | null; city?: string | null; country?: string | null; notes?: string | null };

export const ClientsCreate: React.FC = () => {
  const navigate = useNavigate();
  const { list, show } = useNavigation();
  const [sp, setSp] = useSearchParams();
  const stepFromUrl = Number(sp.get("step") || "1") as 1 | 2;
  const clientFromUrl = sp.get("client");
  const [step, setStep] = React.useState<1 | 2>(stepFromUrl);
  const [createdId, setCreatedId] = React.useState<number | null>(clientFromUrl ? Number(clientFromUrl) : null);

  // ===== KROK 1 – formularz klienta =====
  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormValues>({
    refineCoreProps: { resource: "clients", redirect: false },
    defaultValues: { is_archived: false },
  });

  const sectionRegister = register("section", { required: "Wymagane" });
  const onSection = (v: string) => setValue("section", v as Section, { shouldValidate: true });
  const onBranch = (v: string) => setValue("branch_id", v ? Number(v) : undefined);

  const phoneRegister = register("phone", { pattern: { value: /^[\d+\-\s()]{5,}$/, message: "Nieprawidłowy numer telefonu" } });
  const emailRegister = register("email", { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Nieprawidłowy adres e-mail" } });
  const urlRegister = register("website", { pattern: { value: /^https?:\/\/.+$/i, message: "URL musi zaczynać się od http(s)://" } });

  const submitStep1 = handleSubmit(async (values) => {
    const res: any = await onFinish(values);
    const id = res?.data?.id ?? res?.id;
    if (id) {
      setCreatedId(id);
      setStep(2);
      const next = new URLSearchParams(sp);
      next.set("step", "2");
      next.set("client", String(id));
      setSp(next, { replace: true });
      return;
    }
    list("clients");
  });

  // ===== KROK 2 – adresy =====
  const clientId = createdId ?? (clientFromUrl ? Number(clientFromUrl) : undefined);
  const linksQ = useList<ClientAddress>({
    resource: "client_addresses",
    filters: clientId ? [{ field: "client_id", operator: "eq", value: clientId }] : [],
    pagination: { pageSize: 100 },
    queryOptions: { enabled: step === 2 && !!clientId },
  });

  const addressIds = (linksQ.data?.data || []).map((x) => x.address_id);
  const addressesQ = useMany<Address>({
    resource: "addresses",
    ids: addressIds,
    queryOptions: { enabled: step === 2 && addressIds.length > 0 },
  });

  // 👇 Etykieta dla nowego adresu (dowolna)
  const [newKind, setNewKind] = React.useState<string>("Siedziba");

  // Tworzenie nowego adresu z powrotem na LISTĘ klientów (jak chciałeś)
  const goAddNewAddress = (kind?: string) => {
    const q = new URLSearchParams();
    if (clientId) q.set("client", String(clientId));
    if (kind) q.set("kind", kind);
    q.set("return", `/admin/clients`);
    navigate(`/admin/addresses/create?${q.toString()}`);
  };

  const finish = () => {
    if (clientId) return show("clients", clientId);
    list("clients");
  };

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("clients")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox className="items-center gap-3">
        <Lead title="Nowy klient — kreator" description={step === 1 ? "Krok 1/2: Dane klienta" : `Krok 2/2: Adresy dla #${clientId}`} />
        <div className="flex items-center gap-2 text-sm">
          <Badge variant={step >= 1 ? "secondary" : "outline"}>1. Klient</Badge>
          <ChevronRight className="w-4 h-4" />
          <Badge variant={step >= 2 ? "secondary" : "outline"}>2. Adresy</Badge>
        </div>
      </FlexBox>

      {step === 1 && (
        <Card className="mt-2">
          <CardHeader><CardTitle>Parametry klienta</CardTitle></CardHeader>
          <CardContent>
            <Form onSubmit={submitStep1}>
              <GridBox variant="1-2-2">
                <FormControl label="Nazwa" htmlFor="name" error={errMsg(errors.name)} required>
                  <Input id="name" {...register("name", { required: "Wymagane" })} />
                </FormControl>
                <FormControl label="Sekcja" error={errMsg(errors.section)} required>
                  <input type="hidden" {...sectionRegister} />
                  <Select onValueChange={onSection}>
                    <SelectTrigger><SelectValue placeholder="Wybierz sekcję" /></SelectTrigger>
                    <SelectContent>
                      {SECTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormControl>
              </GridBox>

              <GridBox variant="1-2-2">
                <FormControl label="Kategoria" htmlFor="category">
                  <Input id="category" {...register("category")} />
                </FormControl>
                <FormControl label="Oddział (branch_id)" htmlFor="branch_id">
                  <LookupSelect
                    resource="branches"
                    value={watch("branch_id")}
                    onChange={onBranch}
                    renderLabel={(b: any) => `${b.name}${b.city ? " — " + b.city : ""} (#${b.id})`}
                    placeholder="Wybierz oddział (opcjonalnie)"
                  />
                </FormControl>
              </GridBox>

              <GridBox variant="1-2-2">
                <FormControl label="Opiekun (account_owner)" htmlFor="account_owner">
                  <LookupSelect
                    resource="users"
                    value={watch("account_owner")}
                    onChange={(v) => setValue("account_owner", v || undefined)}
                    renderLabel={(u: any) => `${u.full_name} <${u.email}>`}
                    placeholder="Wybierz opiekuna (opcjonalnie)"
                  />
                </FormControl>
                <div />
              </GridBox>

              <GridBox variant="1-2-2">
                <FormControl label="Telefon" htmlFor="phone" error={errMsg(errors.phone)}>
                  <Input id="phone" {...phoneRegister} />
                </FormControl>
                <FormControl label="Email" htmlFor="email" error={errMsg(errors.email)}>
                  <Input id="email" type="email" {...emailRegister} />
                </FormControl>
                <FormControl label="WWW" htmlFor="website" error={errMsg(errors.website)}>
                  <Input id="website" type="url" {...urlRegister} />
                </FormControl>
              </GridBox>

              <FormControl label="Opis">
                <Textarea rows={3} {...register("description")} />
              </FormControl>

              <FormControl label="Archiwum">
                <input type="checkbox" {...register("is_archived")} />
              </FormControl>

              <FormActions>
                <Button type="button" variant="outline" onClick={() => list("clients")}>Anuluj</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Tworzenie..." : "Dalej: Adresy"}
                </Button>
              </FormActions>
            </Form>
          </CardContent>
        </Card>
      )}

      {step === 2 && clientId && (
        <Card className="mt-2">
          <CardHeader><CardTitle>Adresy klienta (ID #{clientId})</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <ClientAddressLinker clientId={clientId} onLinked={() => list("clients")} />

            {/* Tworzenie nowego adresu z dowolną etykietą */}
            <div className="flex gap-2 items-center">
              <Input
                placeholder='Etykieta (np. "Siedziba", "Magazyn", "Plac", "Administracja")'
                className="w-56"
                value={newKind}
                onChange={(e) => setNewKind(e.target.value)}
              />
              <Button onClick={() => goAddNewAddress(newKind || undefined)}>Dodaj nowy adres</Button>
            </div>

            <Separator />

            {(linksQ.isLoading || addressesQ.isLoading) && <div>Ładowanie adresów...</div>}
            {!linksQ.isLoading && addressIds.length === 0 && (
              <div className="text-sm text-muted-foreground">Brak powiązanych adresów.</div>
            )}
            {addressIds.length > 0 && (
              <div className="space-y-3">
                {(linksQ.data?.data || []).map((link) => {
                  const addr = addressesQ.data?.data?.find((a) => a.id === link.address_id);
                  return (
                    <div key={link.id} className="rounded border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{link.kind || "adres"}</Badge>
                        <Badge variant="secondary">ID #{link.address_id}</Badge>
                      </div>
                      {addr ? (
                        <div className="text-sm leading-6">
                          <div>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</div>
                          <div>{[addr.postal_code, addr.city].filter(Boolean).join(" ")}</div>
                          <div>{addr.country || "PL"}</div>
                          {addr.notes && <div className="text-muted-foreground mt-1">{addr.notes}</div>}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">Nie udało się pobrać szczegółów adresu.</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <Separator />

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <div className="text-sm">Klient został utworzony. Dodaj adresy lub zakończ.</div>
            </div>

            <FormActions>
              <Button variant="outline" onClick={() => show("clients", clientId)}>Przejdź do szczegółów klienta</Button>
              <Button onClick={finish}>Zakończ</Button>
            </FormActions>
          </CardContent>
        </Card>
      )}
    </SubPage>
  );
};

