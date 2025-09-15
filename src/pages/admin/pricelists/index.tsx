
// ================================
// path: src/pages/admin/pricelists/index.tsx
// ================================
import { Route } from "react-router-dom";
import { PricelistsList } from "./list";
import { PricelistsCreate } from "./create";
import { PricelistsEdit } from "./edit";
import { PricelistsShow } from "./show";

export const pricelistsResource = {
  name: "price_lists", // nazwa tabeli w DB / zasobu w dataProviderze
  list: "/admin/pricelists",
  create: "/admin/pricelists/create",
  edit: "/admin/pricelists/edit/:id",
  show: "/admin/pricelists/show/:id",
  meta: { label: "Cenniki" },
};

export const pricelistsChildRoutes = [
  <Route key="pricelists-index" index element={<PricelistsList />} />,
  <Route key="pricelists-create" path="create" element={<PricelistsCreate />} />,
  <Route key="pricelists-edit" path="edit/:id" element={<PricelistsEdit />} />,
  <Route key="pricelists-show" path="show/:id" element={<PricelistsShow />} />,
];

export { PricelistsList, PricelistsCreate, PricelistsEdit, PricelistsShow };
