// ================================
// path: src/pages/kierowca/index.tsx
// ================================
import { lazy, Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { BackofficeLayout } from "../_shared/BackofficeLayout";
import { RoleGuard } from "../_shared/RoleGuard";
import { LoadingFallback } from "../_shared/LoadingFallback";
import { DashboardKierowca } from "./dashboard/Overview";

const KierowcaRoutes = () => (
  <Routes>
    <Route element={<BackofficeLayout><Outlet /></BackofficeLayout>}>
      <Route index element={<Navigate to="dashboard/overview" replace />} />
      <Route path="dashboard/overview" element={<DashboardKierowca />} />
    </Route>
  </Routes>
);

const KierowcaPanel = lazy(() => Promise.resolve({ default: KierowcaRoutes }));

export const KierowcaModule = (
  <Route
    path="/kierowca/*"
    element={
      <Authenticated key="kierowca-auth" fallback={<Navigate to="/login" replace /> }>
        <RoleGuard expected="kierowca">
          <Suspense fallback={<LoadingFallback text="Ładowanie panelu kierowcy..." colorClass="border-purple-600" />}>
            <KierowcaPanel />
          </Suspense>
        </RoleGuard>
      </Authenticated>
    }
  />
);