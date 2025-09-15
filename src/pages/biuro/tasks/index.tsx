// ================================
// path: src/pages/biuro/tasks/index.tsx
// ================================
import { Route } from "react-router-dom";
import { TasksList, TasksCreate, TasksEdit, TasksShow } from "@/pages/admin/tasks";

export const officeTasksResource = {
  name: "tasks",
  list: "/biuro/tasks",
  create: "/biuro/tasks/create",
  edit: "/biuro/tasks/edit/:id",
  show: "/biuro/tasks/show/:id",
  meta: { label: "Zadania" },
};

export const officeTasksChildRoutes = [
  <Route key="tasks-index" index element={<TasksList />} />,
  <Route key="tasks-create" path="create" element={<TasksCreate />} />,
  <Route key="tasks-edit" path="edit/:id" element={<TasksEdit />} />,
  <Route key="tasks-show" path="show/:id" element={<TasksShow />} />,
];
