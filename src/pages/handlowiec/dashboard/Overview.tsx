// ================================
// path: src/pages/handlowiec/dashboard/Overview.tsx
// ================================
import React from "react";


export const DashboardHandlowiec: React.FC = () => (
<div className="p-6 space-y-6">
<h1 className="text-2xl font-bold">Dashboard – Handlowiec</h1>
<div className="grid gap-4 md:grid-cols-3">
<div className="rounded-2xl border p-4 shadow-sm">Nowe leady: 3</div>
<div className="rounded-2xl border p-4 shadow-sm">Klienci bez aktywności 7d: 4</div>
<div className="rounded-2xl border p-4 shadow-sm">Spotkania dziś: 2</div>
</div>
</div>
);