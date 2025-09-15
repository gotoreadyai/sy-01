// ================================
// path: src/pages/admin/reports/index.tsx
// ================================
import { Route } from "react-router-dom";
import { ReportsHome } from "./list";
import { ClientActivity } from "./report-client-activity";

export const reportsResource = {
  name: "reports",
  list: "/admin/reports",
  meta: { label: "Raporty" },
};

export const reportsChildRoutes = [
  <Route key="reports-index" index element={<ReportsHome />} />,
  <Route key="reports-client" path="client-activity" element={<ClientActivity />} />,
];

export { ReportsHome, ClientActivity };
