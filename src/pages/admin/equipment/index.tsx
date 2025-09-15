// ================================
// path: src/pages/admin/equipment/index.tsx
// ================================
import { Route } from "react-router-dom";
import { EquipmentList } from "./list";
import { EquipmentCreate } from "./create";
import { EquipmentEdit } from "./edit";
import { EquipmentShow } from "./show";

/**
 * UWAGA:
 *  - name = "yard_equipment" (taka jest nazwa tabeli w Supabase)
 *  - ścieżki URL zostają /admin/equipment/...
 */
export const equipmentResource = {
  name: "yard_equipment",
  list: "/admin/equipment",
  create: "/admin/equipment/create",
  edit: "/admin/equipment/edit/:id",
  show: "/admin/equipment/show/:id",
  meta: { label: "Sprzęt placowy" },
};

export const equipmentChildRoutes = [
  <Route key="equipment-index" index element={<EquipmentList />} />,
  <Route key="equipment-create" path="create" element={<EquipmentCreate />} />,
  <Route key="equipment-edit" path="edit/:id" element={<EquipmentEdit />} />,
  <Route key="equipment-show" path="show/:id" element={<EquipmentShow />} />,
];

export { EquipmentList, EquipmentCreate, EquipmentEdit, EquipmentShow };
