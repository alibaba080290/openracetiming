export type RaceType = 'endurance' | 'classic';

export interface Driver {
  id: string;
  name: string;
  kartNumber: number;
  team?: string;
}

export interface LapEvent {
  id: string;
  time: number; // Date.now()
  kartNumber?: number; // optionnel, quand on branchera la vision
}

export interface Race {
  id: string;
  name: string;
  type: RaceType;
  laps?: number; // classic
  duration?: number; // endurance (minutes)
  start: Date;

  /** N O U V E A U S */
  drivers: Driver[];
  lapEvents: LapEvent[];
}
