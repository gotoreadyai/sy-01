// ================================
// path: src/pages/biuro/dashboard/Overview.tsx
// ================================
import React from "react";
import { useNavigation, useTable } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button, Separator } from "@/components/ui";
import { FlexBox, GridBox } from "@/components/shared";
import { Lead } from "@/components/reader";
import { ListTree, Truck, Users } from "lucide-react";

const useCounter = (resource: string, filters: any[] = []) => {
  const { tableQuery } = useTable({
    resource,
    filters: filters.length ? { initial: filters } : undefined,
    pagination: { current: 1, pageSize: 1 },
  });
  return {
    loading: tableQuery.isLoading,
    total: typeof tableQuery.data?.total === "number" ? tableQuery.data.total : undefined,
  };
};

export const DashboardOffice: React.FC = () => {
  // metryki
  const tasksNew = useCounter("tasks", [{ field: "status", operator: "eq", value: "nowe" }]);
  const tasksInProgress = useCounter("tasks", [{ field: "status", operator: "eq", value: "w_realizacji" }]);
  const clients = useCounter("clients");
  const vehicles = useCounter("vehicles");

  const { list } = useNavigation();

  const Stat = ({ label, value, loading }: { label: string; value?: number; loading: boolean }) => (
    <Card>
      <CardHeader className="pb-2">
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{loading ? "…" : (value ?? "—")}</div>
      </CardContent>
    </Card>
  );

  const Shortcut = ({
    label,
    description,
    onClick,
    icon,
  }: {
    label: string;
    description: string;
    onClick: () => void;
    icon: React.ReactNode;
  }) => (
    <Card className="transition hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">{icon}{label}</div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={onClick}>Przejdź</Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <Lead title="Dashboard – Biuro" description="Szybki podgląd i skróty" />

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Zadania: nowe" value={tasksNew.total} loading={tasksNew.loading} />
        <Stat label="Zadania: w realizacji" value={tasksInProgress.total} loading={tasksInProgress.loading} />
        <Stat label="Klienci" value={clients.total} loading={clients.loading} />
        <Stat label="Pojazdy" value={vehicles.total} loading={vehicles.loading} />
      </div>

      <Separator />

      <GridBox>
        <Shortcut
          label="Zadania"
          description="Lista i plan zadań"
          onClick={() => list("tasks")}
          icon={<ListTree className="h-4 w-4" />}
        />
        <Shortcut
          label="Klienci"
          description="Baza klientów"
          onClick={() => list("clients")}
          icon={<Users className="h-4 w-4" />}
        />
        <Shortcut
          label="Flota"
          description="Pojazdy w systemie"
          onClick={() => list("vehicles")}
          icon={<Truck className="h-4 w-4" />}
        />
      </GridBox>
    </div>
  );
};
