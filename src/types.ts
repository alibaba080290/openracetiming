// src/types.ts
export interface Driver {
  id: string; // UUID ou timestamp
  name: string;
  kartNumber: number; // n° de kart
  team?: string;
  helmetColor?: string;
}
