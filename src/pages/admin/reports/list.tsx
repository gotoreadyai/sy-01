// ================================
// path: src/pages/admin/reports/list.tsx
// ================================
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox, GridBox } from "@/components/shared";
import { SubPage } from "@/components/layout";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

export const ReportsHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SubPage>
      <FlexBox>
        <Lead title="Raporty" description="Proste raporty i eksporty" />
      </FlexBox>

      <GridBox>
        <Card className="hover:shadow-md transition">
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-4 h-4" /> Aktywność klienta</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Wydarzenia/zadania powiązane z wybranym klientem w zakresie dat.</p>
            <Button variant="outline" className="mt-3" onClick={() => navigate("/admin/reports/client-activity")}>Otwórz</Button>
          </CardContent>
        </Card>
      </GridBox>
    </SubPage>
  );
};
