// ================================
// path: src/pages/admin/branches/index.tsx
// ================================
import { Route } from "react-router-dom";
import { BranchesList } from "./list";
import { BranchesCreate } from "./create";
import { BranchesEdit } from "./edit";
import { BranchesShow } from "./show";

export const branchesResource = {
  name: "branches",
  list: "/admin/branches",
  create: "/admin/branches/create",
  edit: "/admin/branches/edit/:id",
  show: "/admin/branches/show/:id",
  meta: { label: "Oddziały" },
};

export const branchesChildRoutes = [
  <Route key="branches-index" index element={<BranchesList />} />,
  <Route key="branches-create" path="create" element={<BranchesCreate />} />,
  <Route key="branches-edit" path="edit/:id" element={<BranchesEdit />} />,
  <Route key="branches-show" path="show/:id" element={<BranchesShow />} />,
];

export { BranchesList, BranchesCreate, BranchesEdit, BranchesShow };
