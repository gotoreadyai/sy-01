// ================================
// path: src/pages/admin/vacations/index.tsx
// ================================
import { Route } from "react-router-dom";
import { VacationsList } from "./list";
import { VacationsCreate } from "./create";
import { VacationsEdit } from "./edit";
import { VacationsShow } from "./show";

export const RES = "hr_vacations"; // ⬅️ NAZWA TABELI W SUPABASE

export const vacationsResource = {
  name: RES,
  list: "/admin/vacations",
  create: "/admin/vacations/create",
  edit: "/admin/vacations/edit/:id",
  show: "/admin/vacations/show/:id",
  meta: { label: "Urlopy" },
};

export const vacationsChildRoutes = [
  <Route key="vac-index" index element={<VacationsList />} />,
  <Route key="vac-create" path="create" element={<VacationsCreate />} />,
  <Route key="vac-edit" path="edit/:id" element={<VacationsEdit />} />,
  <Route key="vac-show" path="show/:id" element={<VacationsShow />} />,
];

export { VacationsList, VacationsCreate, VacationsEdit, VacationsShow };
