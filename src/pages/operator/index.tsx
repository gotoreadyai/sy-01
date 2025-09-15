// ================================
// path: src/pages/operator/index.tsx
// ================================
import { lazy, Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { BackofficeLayout } from "../_shared/BackofficeLayout";
import { RoleGuard } from "../_shared/RoleGuard";
import { LoadingFallback } from "../_shared/LoadingFallback";
import { DashboardOperator } from "./dashboard/Overview";

const OperatorRoutes = () => (
  <Routes>
    <Route element={<BackofficeLayout><Outlet /></BackofficeLayout>}>
      <Route index element={<Navigate to="dashboard/overview" replace />} />
      <Route path="dashboard/overview" element={<DashboardOperator />} />
    </Route>
  </Routes>
);

const OperatorPanel = lazy(() => Promise.resolve({ default: OperatorRoutes }));

export const OperatorModule = (
  <Route
    path="/operator/*"
    element={
      <Authenticated key="operator-auth" fallback={<Navigate to="/login" replace /> }>
        <RoleGuard expected="operator">
          <Suspense fallback={<LoadingFallback text="Ładowanie panelu operatora..." colorClass="border-purple-600" />}>
            <OperatorPanel />
          </Suspense>
        </RoleGuard>
      </Authenticated>
    }
  />
);
