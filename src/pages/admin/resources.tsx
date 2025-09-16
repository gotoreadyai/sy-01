// ================================
// path: src/pages/admin/resources.tsx
// ================================
import type { IResourceItem } from "@refinedev/core";
import {
  LayoutDashboard,
  ListTree,
  Truck,
  Users,
  Building2,
  Shield,
  Package,
  CalendarDays,
  Files,
  Wrench,
  FileText,
  MapPin,
} from "lucide-react";

import { tasksResource } from "./tasks";
import { vehiclesResource } from "./vehicles";
import { branchesResource } from "./branches";
import { clientsResource } from "./clients";
import { usersResource } from "./users";
import { containersResource } from "./containers";
import { calendarResource } from "./calendar";
import { pricelistsResource } from "./pricelists";
import { equipmentResource } from "./equipment";
import { haulsResource } from "./hauls";
import { maintenancesResource } from "./maintenances";
import { vacationsResource } from "./vacations";
import { reportsResource } from "./reports";
import { addressesResource } from "./addresses";

export const adminResources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/admin/dashboard/overview",
    meta: { label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  },

  {
    ...calendarResource,
    meta: {
      ...calendarResource.meta,
      icon: <CalendarDays className="h-4 w-4" />,
    },
  },
  {
    ...tasksResource,
    meta: { ...tasksResource.meta, icon: <ListTree className="h-4 w-4" /> },
  },
  {
    ...haulsResource,
    meta: {
      ...haulsResource.meta,
      icon: <Truck className="h-4 w-4" />,
      separatorAfter: true,
    },
  },


  {
    ...clientsResource,
    meta: { ...clientsResource.meta, icon: <Users className="h-4 w-4" /> },
  },
  {
    ...branchesResource,
    meta: {
      ...branchesResource.meta,
      icon: <Building2 className="h-4 w-4" />,
    },
  },
  
  {
    ...addressesResource,
    meta: { ...addressesResource.meta, icon: <MapPin className="h-4 w-4" /> },
  },
  
  {
    ...pricelistsResource,
    meta: {
      ...pricelistsResource.meta,
      icon: <Files className="h-4 w-4" />,
      separatorAfter: true,
    },
  },


  {
    ...vehiclesResource,
    meta: { ...vehiclesResource.meta, icon: <Truck className="h-4 w-4" /> },
  },

  {
    ...containersResource,
    meta: {
      ...containersResource.meta,
      icon: <Package className="h-4 w-4" />,
    },
  },

  {
    ...equipmentResource,
    meta: { ...equipmentResource.meta, icon: <Package className="h-4 w-4" /> },
  },
  {
    ...maintenancesResource,
    meta: {
      ...maintenancesResource.meta,
      icon: <Wrench className="h-4 w-4" />,
      separatorAfter: true,
    },
  },
 
  {
    ...usersResource,
    meta: { ...usersResource.meta, icon: <Shield className="h-4 w-4" /> },
  },
  {
    ...vacationsResource,
    meta: {
      ...vacationsResource.meta,
      icon: <CalendarDays className="h-4 w-4" />,
     
    },
  },
  {
    ...reportsResource,
    meta: { ...reportsResource.meta, icon: <FileText className="h-4 w-4" /> },
  },
];
