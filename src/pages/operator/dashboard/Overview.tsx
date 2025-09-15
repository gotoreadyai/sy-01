// ================================
// path: src/pages/operator/dashboard/Overview.tsx
// ================================
import React from "react";


export const DashboardOperator: React.FC = () => (
<div className="p-6 space-y-6">
<h1 className="text-2xl font-bold">Dashboard – Operator</h1>
<div className="grid gap-4 md:grid-cols-3">
<div className="rounded-2xl border p-4 shadow-sm">Zadania na placu: 5</div>
<div className="rounded-2xl border p-4 shadow-sm">Zgłoszenia serwisowe: 1</div>
<div className="rounded-2xl border p-4 shadow-sm">Kontenery do przestawienia: 2</div>
</div>
</div>
);