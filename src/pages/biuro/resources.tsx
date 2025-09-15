// ================================
// path: src/pages/biuro/resources.tsx
// ================================
import type { IResourceItem } from "@refinedev/core";
import { LayoutDashboard, ListTree, Truck, Users } from "lucide-react";

export const biuroResources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/biuro/dashboard/overview",
    meta: { label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  },
  {
    name: "tasks",
    list: "/biuro/tasks",
    create: "/biuro/tasks/create",
    edit: "/biuro/tasks/edit/:id",
    show: "/biuro/tasks/show/:id",
    meta: { label: "Zadania", icon: <ListTree className="h-4 w-4" /> },
  },
  {
    name: "vehicles",
    list: "/biuro/vehicles",
    create: "/biuro/vehicles/create",
    edit: "/biuro/vehicles/edit/:id",
    show: "/biuro/vehicles/show/:id",
    meta: { label: "Flota", icon: <Truck className="h-4 w-4" /> },
  },
  {
    name: "clients",
    list: "/biuro/clients",
    create: "/biuro/clients/create",
    edit: "/biuro/clients/edit/:id",
    show: "/biuro/clients/show/:id",
    meta: { label: "Klienci", icon: <Users className="h-4 w-4" /> },
  },
];
