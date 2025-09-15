// ================================
// path: src/pages/admin/index.tsx
// ================================
import { lazy, Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { BackofficeLayout } from "../_shared/BackofficeLayout";
import { RoleGuard } from "../_shared/RoleGuard";
import { LoadingFallback } from "../_shared/LoadingFallback";
import { DashboardAdmin } from "./dashboard/Overview";

// moduły (routing składowy)
import { tasksChildRoutes } from "./tasks";
import { vehiclesChildRoutes } from "./vehicles";
import { branchesChildRoutes } from "./branches";
import { clientsChildRoutes } from "./clients";
import { usersChildRoutes } from "./users";

// ⬇️ nowe moduły
import { containersChildRoutes } from "./containers";
import { calendarChildRoutes } from "./calendar";
import { pricelistsChildRoutes } from "./pricelists";

const AdminRoutes = () => (
  <Routes>
    <Route element={<BackofficeLayout><Outlet /></BackofficeLayout>}>
      <Route index element={<Navigate to="dashboard/overview" replace />} />
      <Route path="dashboard/overview" element={<DashboardAdmin />} />

      <Route path="users">{usersChildRoutes}</Route>
      <Route path="branches">{branchesChildRoutes}</Route>
      <Route path="tasks">{tasksChildRoutes}</Route>
      <Route path="vehicles">{vehiclesChildRoutes}</Route>
      <Route path="clients">{clientsChildRoutes}</Route>

      {/* nowe */}
      <Route path="containers">{containersChildRoutes}</Route>
      <Route path="calendar">{calendarChildRoutes}</Route>
      <Route path="pricelists">{pricelistsChildRoutes}</Route>

      <Route path="*" element={<Navigate to="/admin/dashboard/overview" replace />} />
    </Route>
  </Routes>
);

const AdminPanel = lazy(() => Promise.resolve({ default: AdminRoutes }));

export const AdminModule = (
  <Route
    path="/admin/*"
    element={
      <Authenticated key="admin-auth" fallback={<Navigate to="/login" replace />}>
        <RoleGuard expected="admin">
          <Suspense
            fallback={
              <LoadingFallback
                text="Ładowanie panelu administratora..."
                colorClass="border-purple-600"
              />
            }
          >
            <AdminPanel />
          </Suspense>
        </RoleGuard>
      </Authenticated>
    }
  />
);
