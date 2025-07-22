// src/contexts/RaceContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Race, Driver, Lap } from '../types';

interface RaceContextType {
  races: Race[];
  setRaces: (races: Race[]) => void;
  selectedRaceId: string | null;
  setSelectedRaceId: (id: string | null) => void;
  addRace: (race: Race) => void;
  updateRace: (race: Race) => void;
  deleteRace: (id: string) => void;
  drivers: Driver[];
  addDriver: (driver: Driver) => void;
  removeDriver: (driverId: string) => void;
  laps: Lap[];
  addLap: (lap: Lap) => void;
  clearLaps: () => void;
}

const RaceContext = createContext<RaceContextType | undefined>(undefined);

export function useRaceContext() {
  const ctx = useContext(RaceContext);
  if (!ctx) {
    throw new Error('useRaceContext must be used inside RaceProvider');
  }
  return ctx;
}

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRaceId, setSelectedRaceId] = useState<string | null>(null);

  // pilotes liés à la course sélectionnée
  const [driversByRace, setDriversByRace] = useState<Record<string, Driver[]>>(
    {}
  );
  // tours au format { raceId, driverId, time, lapNumber }
  const [laps, setLaps] = useState<Lap[]>([]);

  // Helpers pour la course sélectionnée
  const drivers = selectedRaceId ? driversByRace[selectedRaceId] ?? [] : [];

  const addRace = (race: Race) => {
    setRaces((prev) => [...prev, race]);
    setDriversByRace((prev) => ({ ...prev, [race.id]: [] }));
  };

  const updateRace = (race: Race) => {
    setRaces((prev) => prev.map((r) => (r.id === race.id ? race : r)));
  };

  const deleteRace = (id: string) => {
    setRaces((prev) => prev.filter((r) => r.id !== id));
    setDriversByRace((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setLaps((prev) => prev.filter((lap) => lap.raceId !== id));
    if (selectedRaceId === id) {
      setSelectedRaceId(null);
    }
  };

  const addDriver = (driver: Driver) => {
    if (!selectedRaceId) {
      return;
    }
    setDriversByRace((prev) => {
      const current = prev[selectedRaceId] ?? [];
      // Empêcher les doublons de numéro de kart
      if (current.find((d) => d.kartNumber === driver.kartNumber)) {
        return prev;
      }
      return { ...prev, [selectedRaceId]: [...current, driver] };
    });
  };

  const removeDriver = (driverId: string) => {
    if (!selectedRaceId) {
      return;
    }
    setDriversByRace((prev) => {
      const current = prev[selectedRaceId] ?? [];
      return {
        ...prev,
        [selectedRaceId]: current.filter((d) => d.id !== driverId),
      };
    });
    setLaps((prev) => prev.filter((lap) => lap.driverId !== driverId));
  };

  // Ajout d’un tour (laptime)
  const addLap = (lap: Lap) => {
    setLaps((prev) => [...prev, lap]);
  };

  const clearLaps = () => {
    if (!selectedRaceId) {
      return;
    }
    setLaps((prev) => prev.filter((lap) => lap.raceId !== selectedRaceId));
  };

  return (
    <RaceContext.Provider
      value={{
        races,
        setRaces,
        selectedRaceId,
        setSelectedRaceId,
        addRace,
        updateRace,
        deleteRace,
        drivers,
        addDriver,
        removeDriver,
        laps: laps.filter((lap) => lap.raceId === selectedRaceId),
        addLap,
        clearLaps,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};
