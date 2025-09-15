// ================================
// path: src/pages/_shared/RoleGuard.tsx
// ================================
import React from "react";
import { useList } from "@refinedev/core";

/** Normalizacja nazw ról */
type RoleRaw =
  | "administrator" | "admin"
  | "biuro" | "logistyk" | "handlowiec" | "operator"
  | "kierowca_krotko" | "kierowca_dlugo" | "kierowca"
  | string;

type RoleCanonical = "administrator" | "biuro" | "logistyk" | "handlowiec" | "operator" | "kierowca";

const canonicalizeRole = (r?: RoleRaw): RoleCanonical | undefined => {
  const x = (r ?? "").toLowerCase();
  if (x === "administrator" || x === "admin") return "administrator";
  if (x === "biuro") return "biuro";
  if (x === "logistyk") return "logistyk";
  if (x === "handlowiec") return "handlowiec";
  if (x === "operator") return "operator";
  if (x === "kierowca" || x === "kierowca_krotko" || x === "kierowca_dlugo") return "kierowca";
  return undefined;
};

export const RoleGuard: React.FC<{
  expected: string | string[];
  branchId?: number;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ expected, branchId, fallback = null, children }) => {
  const needs = (Array.isArray(expected) ? expected : [expected])
    .map(canonicalizeRole).filter(Boolean) as RoleCanonical[];

  // Pobierz *efektywne* role zalogowanego (widok powinien filtrować RLS-em do auth.uid())
  const { data, isLoading, isError } = useList({
    resource: "v_user_effective_roles",
    pagination: { pageSize: 200, current: 1 }, // nie trafia do URL
  });

  if (isLoading) return <div className="p-6">Ładowanie…</div>;
  if (isError) return <div className="p-6 text-red-600">Błąd ładowania ról.</div>;

  const rows = (data?.data as any[]) ?? [];
  const hasRole = rows.some((r) => {
    const rCanon = canonicalizeRole(r.role);
    if (!rCanon) return false;
    const roleOk = needs.includes(rCanon);
    const branchOk = branchId ? (r.branch_id === branchId || r.branch_id === null) : true;
    return roleOk && branchOk;
  });

  return hasRole ? <>{children}</> : <>{fallback}</>;
};

export const getRedirectPathForRole = (roles: RoleRaw[] | RoleRaw): string => {
  const arr = Array.isArray(roles) ? roles : [roles];
  const canon = arr.map(canonicalizeRole).filter(Boolean) as RoleCanonical[];
  const order: RoleCanonical[] = ["administrator","biuro","logistyk","handlowiec","operator","kierowca"];
  const map: Record<RoleCanonical, string> = {
    administrator: "/admin/dashboard/overview",
    biuro: "/biuro/dashboard/overview",
    logistyk: "/logistyk/dashboard/overview",
    handlowiec: "/handlowiec/dashboard/overview",
    operator: "/operator/dashboard/overview",
    kierowca: "/kierowca/dashboard/overview",
  };
  const picked = order.find((r) => canon.includes(r));
  return picked ? map[picked] : "/admin/dashboard/overview";
};
