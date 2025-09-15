// ================================
// path: src/pages/admin/tasks/index.tsx
// ================================
import { Route } from "react-router-dom";
import { TasksList } from "./list";
import { TasksCreate } from "./create";
import { TasksEdit } from "./edit";
import { TasksShow } from "./show";

export const tasksResource = {
  name: "tasks",
  list: "/admin/tasks",
  create: "/admin/tasks/create",
  edit: "/admin/tasks/edit/:id",
  show: "/admin/tasks/show/:id",
  meta: { label: "Zadania" },
};

export const tasksChildRoutes = [
  <Route key="tasks-index" index element={<TasksList />} />,
  <Route key="tasks-create" path="create" element={<TasksCreate />} />,
  <Route key="tasks-edit" path="edit/:id" element={<TasksEdit />} />,
  <Route key="tasks-show" path="show/:id" element={<TasksShow />} />,
];

export { TasksList, TasksCreate, TasksEdit, TasksShow };