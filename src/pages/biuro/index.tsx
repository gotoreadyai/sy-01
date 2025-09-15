// ================================
// path: src/pages/biuro/index.tsx
// ================================
import { lazy, Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { BackofficeLayout } from "../_shared/BackofficeLayout";
import { RoleGuard } from "../_shared/RoleGuard";
import { LoadingFallback } from "../_shared/LoadingFallback";
import { DashboardOffice } from "./dashboard/Overview";

// podmoduły
import { officeTasksChildRoutes } from "./tasks";
import { officeVehiclesChildRoutes } from "./vehicles";
import { officeClientsChildRoutes } from "./clients";

const BiuroRoutes = () => (
  <Routes>
    <Route element={<BackofficeLayout brand="Backoffice – Biuro"><Outlet /></BackofficeLayout>}>
      <Route index element={<Navigate to="dashboard/overview" replace />} />
      <Route path="dashboard/overview" element={<DashboardOffice />} />

      <Route path="tasks">
        {officeTasksChildRoutes}
      </Route>

      <Route path="vehicles">
        {officeVehiclesChildRoutes}
      </Route>

      <Route path="clients">
        {officeClientsChildRoutes}
      </Route>

      <Route path="*" element={<Navigate to="/biuro/dashboard/overview" replace />} />
    </Route>
  </Routes>
);

const BiuroPanel = lazy(() => Promise.resolve({ default: BiuroRoutes }));

export const BiuroModule = (
  <Route
    path="/biuro/*"
    element={
      <Authenticated key="biuro-auth" fallback={<Navigate to="/login" replace />}>
        <RoleGuard expected="biuro">
          <Suspense fallback={<LoadingFallback text="Ładowanie panelu Biura..." colorClass="border-blue-600" />}>
            <BiuroPanel />
          </Suspense>
        </RoleGuard>
      </Authenticated>
    }
  />
);
