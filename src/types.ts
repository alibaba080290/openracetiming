export type RaceType = 'endurance' | 'classic';

export interface Race {
  id: string;
  name: string;
  type: RaceType;
  laps?: number; // classic
  duration?: number; // endurance (minutes)
  start: Date;
}

export interface Driver {
  id: string;
  name: string;
  kartNumber: number;
  team?: string;
}
