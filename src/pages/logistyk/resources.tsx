// ================================
// path: src/pages/logistyk/resources.tsx
// ================================
import type { IResourceItem } from "@refinedev/core";
import { LayoutDashboard, ListTree, Truck, Users } from "lucide-react";
import { tasksResource } from "../admin/tasks";
import { vehiclesResource } from "../admin/vehicles";
import { clientsResource } from "../admin/clients";

export const logistykResources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/logistyk/dashboard/overview",
    meta: { label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  },
  // Re-używamy istniejących zasobów z admin, tylko zmieniamy ścieżki i ikony
  { ...tasksResource,    list: "/logistyk/tasks",    create: "/logistyk/tasks/create",    edit: "/logistyk/tasks/edit/:id",    show: "/logistyk/tasks/show/:id",
    meta: { label: "Zadania", icon: <ListTree className="h-4 w-4" /> } },
  { ...vehiclesResource, list: "/logistyk/vehicles", create: "/logistyk/vehicles/create", edit: "/logistyk/vehicles/edit/:id", show: "/logistyk/vehicles/show/:id",
    meta: { label: "Flota",   icon: <Truck className="h-4 w-4" /> } },
  { ...clientsResource,  list: "/logistyk/clients",  create: "/logistyk/clients/create",  edit: "/logistyk/clients/edit/:id",  show: "/logistyk/clients/show/:id",
    meta: { label: "Klienci", icon: <Users className="h-4 w-4" /> } },
];
