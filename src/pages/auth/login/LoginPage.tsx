// ================================
// path: src/pages/auth/login/LoginPage.tsx
// ================================
import React from "react";
import { useIsAuthenticated, useGetIdentity } from "@refinedev/core";
import { useSearchParams, Navigate } from "react-router-dom";
import { LoginLayout } from "./components/LoginLayout";
import { LoginForm } from "./components/LoginForm";
import { useLoginLogic } from "./hooks/useLoginLogic";
import type { LoginUser } from "./types";
import { getRedirectPathForRole } from "@/pages/_shared/RoleGuard";

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data: isAuthenticated, isLoading: authLoading } = useIsAuthenticated();
  const { data: user, isLoading: userLoading } = useGetIdentity<LoginUser>();
  const loginLogic = useLoginLogic();

  const verified = searchParams.get("verified") === "true";
  const passwordChanged = searchParams.get("passwordChanged") === "true";

  if (authLoading || userLoading) {
    return (
      <LoginLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </LoginLayout>
    );
  }

  if (isAuthenticated && user) {
    // Jedno miejsce decydujące o przekierowaniu po zalogowaniu
    const redirectPath = getRedirectPathForRole(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <LoginLayout>
      <LoginForm
        {...loginLogic}
        showVerifiedMessage={verified}
        showPasswordChangedMessage={passwordChanged}
      />
    </LoginLayout>
  );
};

export default LoginPage;
