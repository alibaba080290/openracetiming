export type RaceType = 'endurance' | 'classic';

export interface Driver {
  id: string;
  name: string;
  kartNumber: number;
  team?: string;
}

export interface Lap {
  stamp: number; // horodatage absolu
  kartNumber: number;
  lapTime?: number; // sera calculé lors de l’insertion
}

export interface Race {
  id: string;
  name: string;
  type: RaceType;
  laps?: number;
  duration?: number; // minutes
  start: Date;
  drivers: Driver[];
  lapEvents: Lap[];
}
