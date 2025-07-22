import React, { createContext, useContext, useState } from 'react';
import uuid from 'react-native-uuid';
import { Race, Driver } from '../types';

interface RaceContextValue {
  races: Race[];
  selectedRace?: Race;
  addRace: (race: Omit<Race, 'id' | 'drivers'>) => void;
  setSelectedRace: (race: Race) => void;
  updateDrivers: (raceId: string, drivers: Driver[]) => void;
}

const RaceContext = createContext<RaceContextValue | undefined>(undefined);

export const useRace = () => {
  const ctx = useContext(RaceContext);
  if (!ctx) {
    throw new Error('useRace must be used inside RaceProvider');
  }
  return ctx;
};

export const RaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRace, setSelectedRace] = useState<Race>();

  function addRace(r: Omit<Race, 'id' | 'drivers'>) {
    const newRace: Race = { ...r, id: uuid.v4().toString(), drivers: [] };
    setRaces((prev) => [...prev, newRace]);
  }

  function updateDrivers(raceId: string, drivers: Driver[]) {
    setRaces((prev) =>
      prev.map((r) => (r.id === raceId ? { ...r, drivers } : r))
    );
    if (selectedRace?.id === raceId) {
      setSelectedRace({ ...selectedRace, drivers });
    }
  }

  return (
    <RaceContext.Provider
      value={{ races, selectedRace, addRace, setSelectedRace, updateDrivers }}
    >
      {children}
    </RaceContext.Provider>
  );
};
