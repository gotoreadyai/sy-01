// ================================
// path: src/components/clients/ClientAddressLinker.tsx
// ================================
import * as React from "react";
import { useCreate } from "@refinedev/core";
import { Button, Input } from "@/components/ui";
import { FlexBox } from "@/components/shared";
import { LookupSelect } from "@/components/form/LookupSelect";
import { Link2 } from "lucide-react";

type Props = {
  clientId: number;
  onLinked?: () => void;
};

export const ClientAddressLinker: React.FC<Props> = ({ clientId, onLinked }) => {
  const { mutate: createLink, isLoading } = useCreate();
  const [addressId, setAddressId] = React.useState<number | undefined>();
  const [kind, setKind] = React.useState<string>("Siedziba");

  const onChangeAddr = (v: string) => setAddressId(v ? Number(v) : undefined);

  const doLink = () => {
    if (!addressId) return;
    createLink(
      {
        resource: "client_addresses",
        values: { client_id: clientId, address_id: addressId, kind: kind || null },
      },
      { onSuccess: () => onLinked?.() },
    );
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <LookupSelect
        resource="addresses"
        value={addressId}
        onChange={onChangeAddr}
        renderLabel={(a: any) => `${a.line1}${a.city ? " — " + a.city : ""} (#${a.id})`}
        placeholder="Wybierz istniejący adres"
      />
      <Input
        placeholder='Etykieta (np. "Siedziba", "Magazyn")'
        value={kind}
        onChange={(e) => setKind(e.target.value)}
        className="md:w-56"
      />
      <FlexBox variant="start" className="gap-2">
        <Button variant="outline" onClick={doLink} disabled={isLoading || !addressId}>
          <Link2 className="w-4 h-4 mr-2" /> Powiąż adres
        </Button>
      </FlexBox>
    </div>
  );
};
