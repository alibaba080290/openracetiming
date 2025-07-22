// ─────────────────────────────────────────────
// Definition globale des types domaine
// ─────────────────────────────────────────────
export type RaceType = 'endurance' | 'classic';

export interface Driver {
  id: string; // uuid
  name: string;
  kartNumber: number;
  team?: string;
  helmetColor?: string;
}

export interface Race {
  id: string; // uuid
  name: string;
  type: RaceType;
  laps?: number; // si classic
  duration?: number; // min si endurance
  start: Date;
  drivers?: Driver[]; // rattachement des pilotes
}
