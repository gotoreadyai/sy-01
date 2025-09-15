// ================================
// path: src/pages/no-role/index.tsx
// ================================
import { lazy, Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import { Authenticated } from "@refinedev/core";

const NoRolePage = lazy(() =>
  import("./NoRolePage").then((m) => ({ default: m.NoRolePage }))
);

const Fallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-purple-600" />
  </div>
);

// ⬇️ kluczowa zmiana: dodany `key="no-role-auth"`
export const NoRoleModule = (
  <Route
    path="/no-role"
    element={
      <Authenticated
        key="no-role-auth"
        fallback={<Navigate to="/login" replace />}
      >
        <Suspense fallback={<Fallback />}>
          <NoRolePage />
        </Suspense>
      </Authenticated>
    }
  />
);
