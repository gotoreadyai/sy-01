// ================================
// path: src/pages/admin/maintenances/index.tsx
// ================================
import { Route } from "react-router-dom";
import MaintenancesList from "./list";
import MaintenancesCreate from "./create";
import MaintenancesEdit from "./edit";
import MaintenancesShow from "./show";

export const RES_LIST = "asset_maintenances"; // view: read-only
export const RES_WRITE = "asset_service";     // table: create/edit/delete

export const maintenancesResource = {
  name: RES_LIST,
  list: "/admin/maintenances",
  create: "/admin/maintenances/create",
  edit: "/admin/maintenances/edit/:id",
  show: "/admin/maintenances/show/:id",
  meta: { label: "Serwis / Utrzymanie" },
};

export const maintenancesChildRoutes = [
  <Route key="maint-index" index element={<MaintenancesList />} />,
  <Route key="maint-create" path="create" element={<MaintenancesCreate />} />,
  <Route key="maint-edit" path="edit/:id" element={<MaintenancesEdit />} />,
  <Route key="maint-show" path="show/:id" element={<MaintenancesShow />} />,
];

export { MaintenancesList, MaintenancesCreate, MaintenancesEdit, MaintenancesShow };
