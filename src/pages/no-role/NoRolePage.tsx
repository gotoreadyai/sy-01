// ================================
// path: src/pages/no-role/NoRolePage.tsx
// ================================
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetIdentity } from "@refinedev/core";
import { getRedirectPathForRole } from "@/pages/_shared/RoleGuard";
import { useNavigate } from "react-router-dom";

export const NoRolePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: identity, refetch } = useGetIdentity<any>();

  // Co 10s sprawdzaj, czy admin nadał już rolę
  React.useEffect(() => {
    const t = setInterval(async () => {
      const { data } = await refetch();
      if (data?.role) {
        navigate(getRedirectPathForRole(data.role), { replace: true });
      }
    }, 10_000);
    return () => clearInterval(t);
  }, [navigate, refetch]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Brak przypisanej roli</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Twoje konto istnieje, ale nie masz jeszcze przypisanej roli w systemie.
            Administrator musi nadać Ci uprawnienia.
          </p>

          <div className="text-sm rounded-md border p-3">
            <p className="font-medium mb-1">Co możesz zrobić?</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Skontaktuj się z administratorem w firmie.</li>
              <li>Kliknij poniżej „Sprawdź ponownie uprawnienia”.</li>
              <li>W środowisku testowym nadaj rolę w <code>public.user_roles</code>.</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Odśwież stronę
            </Button>
            <Button
              onClick={async () => {
                const { data } = await refetch();
                if (data?.role) {
                  navigate(getRedirectPathForRole(data.role), { replace: true });
                }
              }}
            >
              Sprawdź ponownie uprawnienia
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
