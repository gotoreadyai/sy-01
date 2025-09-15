// ================================
// path: src/pages/admin/vehicles/index.tsx
// ================================
import { Route } from "react-router-dom";
import { VehiclesList } from "./list";
import { VehiclesCreate } from "./create";
import { VehiclesEdit } from "./edit";
import { VehiclesShow } from "./show";

export const vehiclesResource = {
  name: "vehicles",
  list: "/admin/vehicles",
  create: "/admin/vehicles/create",
  edit: "/admin/vehicles/edit/:id",
  show: "/admin/vehicles/show/:id",
  meta: { label: "Flota" },
};

export const vehiclesChildRoutes = [
  <Route key="vehicles-index" index element={<VehiclesList />} />,
  <Route key="vehicles-create" path="create" element={<VehiclesCreate />} />,
  <Route key="vehicles-edit" path="edit/:id" element={<VehiclesEdit />} />,
  <Route key="vehicles-show" path="show/:id" element={<VehiclesShow />} />,
];

export { VehiclesList, VehiclesCreate, VehiclesEdit, VehiclesShow };
