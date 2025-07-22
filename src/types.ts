// src/types.ts
export type RaceType = 'endurance' | 'classique';

export interface Race {
  id: string;
  name: string;
  type: RaceType;
  laps?: number; // si type === 'classique'
  duration?: number; // minutes si type === 'endurance'
  start: Date;
}

export interface Driver {
  id: string; // UUID ou timestamp
  name: string;
  kartNumber: number; // n° de kart
  team?: string;
  helmetColor?: string;
}
