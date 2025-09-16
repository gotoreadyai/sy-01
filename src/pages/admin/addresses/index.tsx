// ================================
// path: src/pages/admin/addresses/index.tsx
// ================================
import { Route } from "react-router-dom";
import { AddressesList } from "./list";
import { AddressesCreate } from "./create";
import { AddressesEdit } from "./edit";
import { AddressesShow } from "./show";

export const addressesResource = {
  name: "addresses",
  list: "/admin/addresses",
  create: "/admin/addresses/create",
  edit: "/admin/addresses/edit/:id",
  show: "/admin/addresses/show/:id",
  meta: { label: "Adresy" },
};

export const addressesChildRoutes = [
  <Route key="addresses-index" index element={<AddressesList />} />,
  <Route key="addresses-create" path="create" element={<AddressesCreate />} />,
  <Route key="addresses-edit" path="edit/:id" element={<AddressesEdit />} />,
  <Route key="addresses-show" path="show/:id" element={<AddressesShow />} />,
];

export { AddressesList, AddressesCreate, AddressesEdit, AddressesShow };
