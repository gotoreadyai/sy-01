
// ================================
// path: src/pages/admin/pricelists/show.tsx
// ================================
import { useShow, useNavigation } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge, Button, Separator } from "@/components/ui";
import { Lead } from "@/components/reader";
import { FlexBox } from "@/components/shared";
import { ArrowLeft, Edit } from "lucide-react";
import { useLoading } from "@/utility";
import { SubPage } from "@/components/layout";

type Pricelist = {
  id: number;
  title: string;
  content_rich: string | null;
  version_tag?: string | null;
  branch_id?: number | null;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
};

export const PricelistsShow = () => {
  const { queryResult } = useShow<Pricelist>({ resource: "price_lists" });
  const { list, edit } = useNavigation();

  const isLoading = queryResult?.isLoading ?? true;
  const isError = queryResult?.isError ?? false;
  const record = queryResult?.data?.data;

  const init = useLoading({ isLoading, isError });
  if (init) return init;
  if (!record) return null;

  return (
    <SubPage>
      <Button variant="outline" size="sm" onClick={() => list("price_lists")}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do listy
      </Button>

      <FlexBox>
        <Lead title={record.title} description={`ID: #${record.id}`} />
        <Button variant="outline" onClick={() => edit("price_lists", record.id)}>
          <Edit className="w-4 h-4 mr-2" /> Edytuj
        </Button>
      </FlexBox>

      <Card>
        <CardHeader>
          <CardTitle>Szczegóły</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            {record.version_tag && <Badge variant="outline">{record.version_tag}</Badge>}
            {record.branch_id && <Badge variant="outline">oddział #{record.branch_id}</Badge>}
          </div>
          <Separator />
          {record.content_rich ? (
            <div className="prose max-w-none whitespace-pre-wrap">{record.content_rich}</div>
          ) : (
            <div className="text-sm text-muted-foreground">Brak treści</div>
          )}
        </CardContent>
      </Card>
    </SubPage>
  );
};
