// ================================
// path: src/pages/biuro/clients/index.tsx
// ================================
import { Route } from "react-router-dom";
import { ClientsList, ClientsCreate, ClientsEdit, ClientsShow } from "@/pages/admin/clients";

export const officeClientsResource = {
  name: "clients",
  list: "/biuro/clients",
  create: "/biuro/clients/create",
  edit: "/biuro/clients/edit/:id",
  show: "/biuro/clients/show/:id",
  meta: { label: "Klienci" },
};

export const officeClientsChildRoutes = [
  <Route key="clients-index" index element={<ClientsList />} />,
  <Route key="clients-create" path="create" element={<ClientsCreate />} />,
  <Route key="clients-edit" path="edit/:id" element={<ClientsEdit />} />,
  <Route key="clients-show" path="show/:id" element={<ClientsShow />} />,
];
