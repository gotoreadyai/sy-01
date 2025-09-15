// ================================
// path: src/pages/admin/branches/show.tsx
// ================================
import { useShow, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { useLoading } from "@/utility";

type Branch = {
  id: number;
  name: string;
  city?: string | null;
  is_archived?: boolean;
  created_at: string;
  updated_at: string;
};

export const BranchesShow = () => {
  const { queryResult } = useShow<Branch>({ resource: "branches" });
  const { list, edit } = useNavigation();

  // ✅ bezpieczne pobranie pól (queryResult może być undefined)
  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => list("branches")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.name} description={`ID: #${record.id}`} />
        <Button variant="outline" onClick={() => edit("branches", record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader><CardTitle>Szczegóły</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            {record.city && <Badge variant="outline">{record.city}</Badge>}
            {record.is_archived && <Badge variant="destructive">archiwum</Badge>}
          </div>
          <Separator />
          <div className="text-sm">
            <div><b>Utworzono:</b> {new Date(record.created_at).toLocaleString()}</div>
            <div><b>Aktualizacja:</b> {new Date(record.updated_at).toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
