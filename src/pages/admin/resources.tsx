// ================================
// path: src/pages/admin/resources.tsx
// ================================
import type { IResourceItem } from "@refinedev/core";
import { LayoutDashboard, ListTree, Truck, Users, Building2, Shield, Package, CalendarDays, Files } from "lucide-react";

import { tasksResource } from "./tasks";
import { vehiclesResource } from "./vehicles";
import { branchesResource } from "./branches";
import { clientsResource } from "./clients";
import { usersResource } from "./users";

// ⬇️ nowe zasoby
import { containersResource } from "./containers";
import { calendarResource } from "./calendar";
import { pricelistsResource } from "./pricelists";

export const adminResources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/admin/dashboard/overview",
    meta: { label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  },

  { ...usersResource,     meta: { ...usersResource.meta,     icon: <Shield className="h-4 w-4" /> } },
  { ...branchesResource,  meta: { ...branchesResource.meta,  icon: <Building2 className="h-4 w-4" /> } },
  { ...tasksResource,     meta: { ...tasksResource.meta,     icon: <ListTree className="h-4 w-4" /> } },
  { ...vehiclesResource,  meta: { ...vehiclesResource.meta,  icon: <Truck className="h-4 w-4" /> } },
  { ...clientsResource,   meta: { ...clientsResource.meta,   icon: <Users className="h-4 w-4" /> } },

  // nowe pozycje
  { ...containersResource, meta: { ...containersResource.meta, icon: <Package className="h-4 w-4" /> } },
  { ...calendarResource,   meta: { ...calendarResource.meta,   icon: <CalendarDays className="h-4 w-4" /> } },
  { ...pricelistsResource, meta: { ...pricelistsResource.meta, icon: <Files className="h-4 w-4" /> } },
];
