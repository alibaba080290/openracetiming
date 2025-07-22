import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Driver, Race } from '../types';

/* ---- types du contexte -------------------------------------------------- */

interface RaceContextShape {
  /* courses */
  races: Race[];
  addRace: (race: Race) => void;

  /* sélection */
  selectedRace: Race | null;
  selectRace: (id: string) => void;

  /* pilotes reliés à la course sélectionnée */
  drivers: Driver[];
  updateDrivers: (fn: (prev: Driver[]) => Driver[]) => void;
}

/* ---- implémentation ----------------------------------------------------- */

const RaceContext = createContext<RaceContextShape | undefined>(undefined);

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [driversByRace, setDriversByRace] = useState<Record<string, Driver[]>>(
    {}
  );

  /* --- courses ---------------------------------------------------------- */
  const addRace = (race: Race) => setRaces((prev) => [...prev, race]);

  /* --- sélection -------------------------------------------------------- */
  const selectRace = (id: string) => setSelectedId(id);
  const selectedRace = races.find((r) => r.id === selectedId) ?? null;

  /* --- pilotes ---------------------------------------------------------- */
  const drivers = selectedId ? driversByRace[selectedId] ?? [] : [];

  const updateDrivers = (fn: (prev: Driver[]) => Driver[]) => {
    if (!selectedId) {
      return;
    } // rien si aucune course sélectionnée
    setDriversByRace((prev) => ({
      ...prev,
      [selectedId]: fn(prev[selectedId] ?? []),
    }));
  };

  return (
    <RaceContext.Provider
      value={{
        races,
        addRace,
        selectedRace,
        selectRace,
        drivers,
        updateDrivers,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};

/* ---- hook pratique ------------------------------------------------------ */
export const useRace = () => {
  const ctx = useContext(RaceContext);
  if (!ctx) {
    throw new Error('useRace must be used inside <RaceProvider>');
  }
  return ctx;
};
