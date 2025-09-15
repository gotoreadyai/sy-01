// ================================
// path: src/pages/admin/users/RolesEditor.tsx
// ================================
import React, { useMemo, useState } from "react";
import { useTable, useCreate, useDelete } from "@refinedev/core";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Input, Badge } from "@/components/ui";
import { FlexBox } from "@/components/shared";
import { Trash2, Plus } from "lucide-react";

const ROLES = [
  "administrator",
  "biuro",
  "logistyk",
  "handlowiec",
  "kierowca_krotko",
  "kierowca_dlugo",
  "operator",
] as const;

export const RolesEditor: React.FC<{ userId: string }> = ({ userId }) => {
  const { tableQuery } = useTable({
    resource: "user_roles",
    filters: { permanent: [{ field: "user_id", operator: "eq", value: userId }] },
    pagination: { current: 1, pageSize: 100 },
    sorters: { initial: [{ field: "assigned_at", order: "desc" }] },
  });

  const { mutate: createRole, isLoading: creating } = useCreate();
  const { mutate: removeRole } = useDelete();

  const [role, setRole] = useState<string>();
  const [branchId, setBranchId] = useState<string>("");

  const rows = tableQuery.data?.data ?? [];

  const canAdd = useMemo(() => !!role, [role]);

  const add = () => {
    if (!role) return;
    createRole({
      resource: "user_roles",
      values: {
        user_id: userId,
        role,
        branch_id: branchId ? Number(branchId) : null,
      },
      invalidates: ["list", "many", "detail"],
    });
  };

  return (
    <Card>
      <CardHeader><CardTitle>Role użytkownika</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {rows.map((r: any) => (
            <div key={r.id} className="flex items-center gap-2 border rounded-xl px-2 py-1">
              <Badge variant={r.branch_id ? "secondary" : "outline"}>{r.role}</Badge>
              {r.branch_id && <Badge variant="outline">oddział #{r.branch_id}</Badge>}
              <Button size="sm" variant="ghost" onClick={() => removeRole({ resource: "user_roles", id: r.id, invalidates: ["list", "many", "detail"] })}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {!rows.length && <span className="text-muted-foreground text-sm">Brak ról</span>}
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <Select onValueChange={setRole}>
            <SelectTrigger className="w-56"><SelectValue placeholder="Wybierz rolę" /></SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Oddział (opcjonalnie, puste = global)"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-64"
          />

          <Button onClick={add} disabled={!canAdd || creating}>
            <Plus className="w-4 h-4 mr-2" /> Dodaj
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          • Rola z <i>pustym</i> oddziałem działa globalnie. • Można łączyć wiele ról (różne oddziały). • Administrator ma pełny dostęp.
        </div>
      </CardContent>
    </Card>
  );
};
    