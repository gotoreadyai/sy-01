// ================================
// path: src/pages/admin/maintenances/shared.tsx
// ================================
export const ASSET_TYPES = [
    "vehicle",
    "container",
    "equipment",
  ] as const;
  
  export const MAINT_TYPES = [
    "usterka",   // aktywne zgłoszenia usterek
    "naprawa",
    "przeglad",
    "oc",
    "tacho",
    "inne",
  ] as const;
  