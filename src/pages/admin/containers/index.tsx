// ================================
// path: src/pages/admin/containers/index.tsx
// ================================
import { Route } from "react-router-dom";
import { ContainersList } from "./list";
import { ContainersCreate } from "./create";
import { ContainersEdit } from "./edit";
import { ContainersShow } from "./show";

export const containersResource = {
  name: "containers",
  list: "/admin/containers",
  create: "/admin/containers/create",
  edit: "/admin/containers/edit/:id",
  show: "/admin/containers/show/:id",
  meta: { label: "Kontenery" },
};

export const containersChildRoutes = [
  <Route key="containers-index" index element={<ContainersList />} />,
  <Route key="containers-create" path="create" element={<ContainersCreate />} />,
  <Route key="containers-edit" path="edit/:id" element={<ContainersEdit />} />,
  <Route key="containers-show" path="show/:id" element={<ContainersShow />} />,
];

export { ContainersList, ContainersCreate, ContainersEdit, ContainersShow };
