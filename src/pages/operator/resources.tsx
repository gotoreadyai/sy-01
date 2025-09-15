// ================================
// path: src/pages/operator/resources.tsx
// ================================
import type { IResourceItem } from "@refinedev/core";
import { LayoutDashboard } from "lucide-react";


export const operatorResources: IResourceItem[] = [
{ name: "dashboard", list: "/operator/dashboard/overview", meta: { label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> }},
];