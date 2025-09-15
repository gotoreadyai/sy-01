// ================================
// path: src/pages/handlowiec/index.tsx
// ================================
import { lazy, Suspense } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { BackofficeLayout } from "../_shared/BackofficeLayout";
import { RoleGuard } from "../_shared/RoleGuard";
import { LoadingFallback } from "../_shared/LoadingFallback";
import { DashboardHandlowiec } from "./dashboard/Overview";

const HandlowiecRoutes = () => (
  <Routes>
    <Route element={<BackofficeLayout><Outlet /></BackofficeLayout>}>
      <Route index element={<Navigate to="dashboard/overview" replace />} />
      <Route path="dashboard/overview" element={<DashboardHandlowiec />} />
    </Route>
  </Routes>
);

const HandlowiecPanel = lazy(() => Promise.resolve({ default: HandlowiecRoutes }));

export const HandlowiecModule = (
  <Route
    path="/handlowiec/*"
    element={
      <Authenticated key="handlowiec-auth" fallback={<Navigate to="/login" replace /> }>
        <RoleGuard expected="handlowiec">
          <Suspense fallback={<LoadingFallback text="Ładowanie panelu handlowca..." colorClass="border-purple-600" />}>
            <HandlowiecPanel />
          </Suspense>
        </RoleGuard>
      </Authenticated>
    }
  />
);