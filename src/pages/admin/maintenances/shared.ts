// ================================
// path: src/pages/admin/maintenances/shared.ts
// ================================
export const ASSET_KINDS = ["vehicle", "container", "equipment"] as const;

export const SERVICE_KINDS = [
  "przeglad",
  "oc",
  "tacho",
  "naprawa",
  "usterka",
  "inne",
] as const;
