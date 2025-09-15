// ================================
// path: src/pages/logistyk/dashboard/Overview.tsx
// ================================
import React from "react";
import { useTable } from "@refinedev/core";
import { SubPage } from "@/components/layout";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { ListTree, Truck, Users, ArrowRight } from "lucide-react";

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

const MetricCard: React.FC<{ label: string; value?: number; loading?: boolean }> = ({ label, value, loading }) => (
  <Card>
    <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{label}</CardTitle></CardHeader>
    <CardContent><div className="text-3xl font-bold">{loading ? "…" : (value ?? "—")}</div></CardContent>
  </Card>
);

const ShortcutCard: React.FC<{ to: string; label: string; Icon: any; desc?: string }> = ({ to, label, Icon, desc }) => {
  const navigate = useNavigate();
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2"><Icon className="h-5 w-5 opacity-70" />{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{desc ?? "Szybkie przejście do modułu"}</p>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate(to)}>
          Wejdź <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export const DashboardLogistyk: React.FC = () => {
  const tasksAll = useCounter("tasks");
  const vehiclesAll = useCounter("vehicles");
  const clientsAll = useCounter("clients");

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Dashboard – Logistyk" description="Podsumowanie pracy i skróty" />
      </FlexBox>

      <GridBox>
        <MetricCard label="Zadania"  value={tasksAll.total}    loading={tasksAll.loading} />
        <MetricCard label="Flota"    value={vehiclesAll.total} loading={vehiclesAll.loading} />
        <MetricCard label="Klienci"  value={clientsAll.total}  loading={clientsAll.loading} />
      </GridBox>

      <div className="mt-6 space-y-2">
        <h2 className="text-lg font-semibold">Skróty</h2>
        <GridBox>
          <ShortcutCard to="/logistyk/tasks"    label="Zadania"  Icon={ListTree} desc="Plan i realizacja transportów" />
          <ShortcutCard to="/logistyk/vehicles" label="Flota"    Icon={Truck}   desc="Pojazdy i przypisania" />
          <ShortcutCard to="/logistyk/clients"  label="Klienci"  Icon={Users}   desc="Kontrahenci i kontakty" />
        </GridBox>
      </div>
    </SubPage>
  );
};
