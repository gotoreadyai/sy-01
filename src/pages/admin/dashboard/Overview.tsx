// ================================
// path: src/pages/admin/dashboard/Overview.tsx
// ================================
import React from "react";
import { useTable } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { SubPage } from "@/components/layout";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui";
import { getRedirectPathForRole } from "@/pages/_shared/RoleGuard";
import { Building2, ListTree, Users, Settings, Truck, ArrowRight } from "lucide-react";

const useCounter = (resource: string, filters: any[] = []) => {
  const { tableQuery } = useTable({
    resource,
    filters: filters.length ? { initial: filters } : undefined,
    pagination: { current: 1, pageSize: 1 }, // tylko po total
  });
  const loading = tableQuery.isLoading;
  const total = typeof tableQuery.data?.total === "number" ? tableQuery.data.total : undefined;
  return { loading, total };
};

const MetricCard: React.FC<{ label: string; value?: number; loading?: boolean }> = ({
  label,
  value,
  loading,
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{loading ? "…" : (value ?? "—")}</div>
    </CardContent>
  </Card>
);

type RoleKey = "biuro" | "logistyk" | "handlowiec" | "operator" | "kierowca";

const RoleShortcutCard: React.FC<{
  role: RoleKey;
  label: string;
  Icon: React.ComponentType<any>;
}> = ({ role, label, Icon }) => {
  const navigate = useNavigate();
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 opacity-70" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Szybkie wejście do modułu</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => navigate(getRedirectPathForRole(role))}
        >
          Wejdź
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export const DashboardAdmin: React.FC = () => {
  const users = useCounter("users");
  const branches = useCounter("branches");
  const overdue = useCounter("tasks", [{ field: "is_overdue_listed", operator: "eq", value: true }]);

  const shortcuts: Array<{ role: RoleKey; label: string; Icon: any }> = [
    { role: "biuro",      label: "Biuro",      Icon: Building2 },
    { role: "logistyk",   label: "Logistyk",   Icon: ListTree },
    { role: "handlowiec", label: "Handlowiec", Icon: Users },
    { role: "operator",   label: "Operator",   Icon: Settings },
    { role: "kierowca",   label: "Kierowca",   Icon: Truck },
  ];

  return (
    <SubPage>
      <FlexBox>
        <Lead title="Dashboard – Administrator" description="Podsumowanie i skróty" />
      </FlexBox>

      {/* Liczniki (Card + GridBox jak w listach) */}
      <GridBox>
        <MetricCard label="Użytkownicy" value={users.total} loading={users.loading} />
        <MetricCard label="Oddziały" value={branches.total} loading={branches.loading} />
        <MetricCard label="Zadania overdue" value={overdue.total} loading={overdue.loading} />
      </GridBox>

      {/* Skróty do modułów ról – te same patterny Card/Lead/Button */}
      <div className="mt-6 space-y-2">
        <h2 className="text-lg font-semibold">Skróty do modułów ról</h2>
        <GridBox>
          {shortcuts.map(({ role, label, Icon }) => (
            <RoleShortcutCard key={role} role={role} label={label} Icon={Icon} />
          ))}
        </GridBox>
        <p className="text-xs text-muted-foreground">
          Dostęp zostanie ostatecznie zweryfikowany przez RoleGuard w danym module.
        </p>
      </div>
    </SubPage>
  );
};
