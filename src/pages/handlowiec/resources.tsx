// ================================
// path: src/pages/handlowiec/resources.tsx
// ================================
import type { IResourceItem } from "@refinedev/core";
import { LayoutDashboard } from "lucide-react";


export const handlowiecResources: IResourceItem[] = [
{ name: "dashboard", list: "/handlowiec/dashboard/overview", meta: { label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> }},
];