// ================================
/** path: src/pages/logistyk/index.tsx */
// ================================
import { lazy, Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { BackofficeLayout } from "../_shared/BackofficeLayout";
import { RoleGuard } from "../_shared/RoleGuard";
import { LoadingFallback } from "../_shared/LoadingFallback";
import { DashboardLogistyk } from "./dashboard/Overview";

// Reuse child routes z admina (list/create/edit/show) – działają w dowolnym segmencie
import { tasksChildRoutes } from "../admin/tasks";
import { vehiclesChildRoutes } from "../admin/vehicles";
import { clientsChildRoutes } from "../admin/clients";

const LogistykRoutes = () => (
  <Routes>
    <Route element={<BackofficeLayout brand="Logistyka"><Outlet /></BackofficeLayout>}>
      <Route index element={<Navigate to="dashboard/overview" replace />} />
      <Route path="dashboard/overview" element={<DashboardLogistyk />} />

      <Route path="tasks">{tasksChildRoutes}</Route>
      <Route path="vehicles">{vehiclesChildRoutes}</Route>
      <Route path="clients">{clientsChildRoutes}</Route>

      <Route path="*" element={<Navigate to="/logistyk/dashboard/overview" replace />} />
    </Route>
  </Routes>
);

const LogistykPanel = lazy(() => Promise.resolve({ default: LogistykRoutes }));

export const LogistykModule = (
  <Route
    path="/logistyk/*"
    element={
      <Authenticated key="logistyk-auth" fallback={<Navigate to="/login" replace />}>
        <RoleGuard expected="logistyk">
          <Suspense fallback={<LoadingFallback text="Ładowanie panelu logistyka..." colorClass="border-blue-600" />}>
            <LogistykPanel />
          </Suspense>
        </RoleGuard>
      </Authenticated>
    }
  />
);
