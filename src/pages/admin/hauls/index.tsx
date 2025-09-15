// ================================
// path: src/pages/admin/hauls/index.tsx
// ================================
import { Route } from "react-router-dom";
import { HaulsList } from "./list";
import { HaulsCreate } from "./create";
import { HaulsEdit } from "./edit";
import { HaulsShow } from "./show";

export const haulsResource = {
  // NAZWA RESOURCE = nazwa tabeli w DB / endpointu PostgREST
  name: "dispatches",
  list: "/admin/hauls",
  create: "/admin/hauls/create",
  edit: "/admin/hauls/edit/:id",
  show: "/admin/hauls/show/:id",
  meta: { label: "Wywozy" },
};

export const haulsChildRoutes = [
  <Route key="hauls-index" index element={<HaulsList />} />,
  <Route key="hauls-create" path="create" element={<HaulsCreate />} />,
  <Route key="hauls-edit" path="edit/:id" element={<HaulsEdit />} />,
  <Route key="hauls-show" path="show/:id" element={<HaulsShow />} />,
];

export { HaulsList, HaulsCreate, HaulsEdit, HaulsShow };
