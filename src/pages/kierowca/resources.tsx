// ================================
// path: src/pages/kierowca/resources.tsx
// ================================
import type { IResourceItem } from "@refinedev/core";
import { LayoutDashboard } from "lucide-react";


export const kierowcaResources: IResourceItem[] = [
{ name: "dashboard", list: "/kierowca/dashboard/overview", meta: { label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> }},
];