// ================================
// path: src/pages/admin/users/index.tsx
// ================================
import { Route } from "react-router-dom";
import { UsersList } from "./list";
import { UsersCreate } from "./create";
import { UsersEdit } from "./edit";
import { UsersShow } from "./show";

export const usersResource = {
  name: "users",
  list: "/admin/users",
  create: "/admin/users/create",
  edit: "/admin/users/edit/:id",
  show: "/admin/users/show/:id",
  meta: { label: "Użytkownicy" },
};

export const usersChildRoutes = [
  <Route key="users-index" index element={<UsersList />} />,
  <Route key="users-create" path="create" element={<UsersCreate />} />,
  <Route key="users-edit" path="edit/:id" element={<UsersEdit />} />,
  <Route key="users-show" path="show/:id" element={<UsersShow />} />,
];

export { UsersList, UsersCreate, UsersEdit, UsersShow };
