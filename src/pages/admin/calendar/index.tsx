// ================================
// path: src/pages/admin/calendar/index.tsx
// ================================
import { Route } from "react-router-dom";
import { CalendarWeekly } from "./Calendar";

export const calendarResource = {
  name: "calendar",
  list: "/admin/calendar/weekly",
  meta: { label: "Kalendarz" },
};

export const calendarChildRoutes = [
  <Route key="calendar-weekly" path="weekly" element={<CalendarWeekly />} />,
];

export { CalendarWeekly };
