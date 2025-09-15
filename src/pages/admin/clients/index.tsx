// ================================
// path: src/pages/admin/clients/index.tsx
// ================================
import { Route } from "react-router-dom";
import { ClientsList } from "./list";
import { ClientsCreate } from "./create";
import { ClientsEdit } from "./edit";
import { ClientsShow } from "./show";

export const clientsResource = {
  name: "clients",
  list: "/admin/clients",
  create: "/admin/clients/create",
  edit: "/admin/clients/edit/:id",
  show: "/admin/clients/show/:id",
  meta: { label: "Klienci" },
};

export const clientsChildRoutes = [
  <Route key="clients-index" index element={<ClientsList />} />,
  <Route key="clients-create" path="create" element={<ClientsCreate />} />,
  <Route key="clients-edit" path="edit/:id" element={<ClientsEdit />} />,
  <Route key="clients-show" path="show/:id" element={<ClientsShow />} />,
];

export { ClientsList, ClientsCreate, ClientsEdit, ClientsShow };
