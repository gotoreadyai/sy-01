// ================================
// path: src/App.tsx
// ================================
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "./utility";
import { authProvider } from "./utility/auth/authProvider";

// Moduły per rola
import { AdminModule } from "./pages/admin";
import { BiuroModule } from "./pages/biuro";
import { LogistykModule } from "./pages/logistyk";
import { HandlowiecModule } from "./pages/handlowiec";
import { KierowcaModule } from "./pages/kierowca";
import { OperatorModule } from "./pages/operator";
// ⬇️ nowy moduł (brak roli)
import { NoRoleModule } from "./pages/no-role";

// Resources per rola
import { adminResources } from "./pages/admin/resources";
import { biuroResources } from "./pages/biuro/resources";
import { logistykResources } from "./pages/logistyk/resources";
import { handlowiecResources } from "./pages/handlowiec/resources";
import { kierowcaResources } from "./pages/kierowca/resources";
import { operatorResources } from "./pages/operator/resources";

// (opcjonalnie) public landing / auth
import LandingPage from "./pages/landing/Landing";
import { LoginModule, RegisterModule, ForgotPasswordModule, UpdatePasswordModule } from "./pages/auth";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false, staleTime: 5 * 60 * 1000 } },
});

function RefineResourceSwitcher({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const segment = pathname.split("/")[1];

  const resources =
    segment === "admin" ? adminResources :
    segment === "biuro" ? biuroResources :
    segment === "logistyk" ? logistykResources :
    segment === "handlowiec" ? handlowiecResources :
    segment === "kierowca" ? kierowcaResources :
    segment === "operator" ? operatorResources :
    [];

  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      authProvider={authProvider}
      routerProvider={routerProvider}
      resources={resources}
      options={{ syncWithLocation: false, warnWhenUnsavedChanges: true, useNewQueryKeys: true, disableTelemetry: true }}
    >
      {children}
    </Refine>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RefineResourceSwitcher>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* AUTH */}
            {LoginModule}
            {RegisterModule}
            {ForgotPasswordModule}
            {UpdatePasswordModule}

            {/* brak roli */}
            {NoRoleModule}

            {/* APP (ROUTES per rola) */}
            {AdminModule}
            {BiuroModule}
            {LogistykModule}
            {HandlowiecModule}
            {KierowcaModule}
            {OperatorModule}

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RefineResourceSwitcher>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
