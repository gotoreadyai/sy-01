// ================================
// path: src/pages/biuro/vehicles/index.tsx
// ================================
import { Route } from "react-router-dom";
import { VehiclesList, VehiclesCreate, VehiclesEdit, VehiclesShow } from "@/pages/admin/vehicles";

export const officeVehiclesResource = {
  name: "vehicles",
  list: "/biuro/vehicles",
  create: "/biuro/vehicles/create",
  edit: "/biuro/vehicles/edit/:id",
  show: "/biuro/vehicles/show/:id",
  meta: { label: "Flota" },
};

export const officeVehiclesChildRoutes = [
  <Route key="vehicles-index" index element={<VehiclesList />} />,
  <Route key="vehicles-create" path="create" element={<VehiclesCreate />} />,
  <Route key="vehicles-edit" path="edit/:id" element={<VehiclesEdit />} />,
  <Route key="vehicles-show" path="show/:id" element={<VehiclesShow />} />,
];
