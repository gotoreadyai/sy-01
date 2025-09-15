// ================================
// path: src/pages/kierowca/dashboard/Overview.tsx
// ================================
import React from "react";


export const DashboardKierowca: React.FC = () => (
<div className="p-6 space-y-6">
<h1 className="text-2xl font-bold">Dashboard – Kierowca</h1>
<div className="grid gap-4 md:grid-cols-3">
<div className="rounded-2xl border p-4 shadow-sm">Moje zadania dziś: 3</div>
<div className="rounded-2xl border p-4 shadow-sm">Pojazd: brak zalogowania</div>
<div className="rounded-2xl border p-4 shadow-sm">Powiadomienia: 1</div>
</div>
</div>
);