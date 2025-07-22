import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import uuid from 'react-native-uuid';

import Settings from './components/Settings';
import Registration from './components/Registration';
import Timing from './components/Timing';
import Results from './components/Results';
import { Race, Driver, LapEvent } from './types';

const Tab = createBottomTabNavigator();

export default function App() {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRaceId, setSelectedRaceId] = useState<string>();

  // helpers ────────────────────────────────────────────────────────
  const selectedRace = races.find((r) => r.id === selectedRaceId);

  const addRace = (race: Omit<Race, 'drivers' | 'lapEvents'>) =>
    setRaces((prev) => [...prev, { ...race, drivers: [], lapEvents: [] }]);

  const selectRace = (r: Race) => setSelectedRaceId(r.id);

  const updateRace = useCallback(
    (id: string, mutator: (r: Race) => Race) =>
      setRaces((prev) => prev.map((r) => (r.id === id ? mutator(r) : r))),
    []
  );

  // pilotes ---------------------------------------------------------
  const addDriver = (driver: Driver) => {
    if (!selectedRace) {
      return;
    }
    updateRace(selectedRace.id, (r) => ({
      ...r,
      drivers: [...r.drivers, driver],
    }));
  };

  const removeDriver = (driverId: string) => {
    if (!selectedRace) {
      return;
    }
    updateRace(selectedRace.id, (r) => ({
      ...r,
      drivers: r.drivers.filter((d) => d.id !== driverId),
    }));
  };

  // tours / passages ------------------------------------------------
  const addLapEvent = (kartNumber?: number) => {
    if (!selectedRace) {
      return;
    }
    const event: LapEvent = {
      id: uuid.v4().toString(),
      time: Date.now(),
      kartNumber,
    };
    updateRace(selectedRace.id, (r) => ({
      ...r,
      lapEvents: [...r.lapEvents, event],
    }));
  };

  // rendu ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Settings">
            {() => (
              <Settings
                races={races}
                addRace={addRace}
                selectedRace={selectedRace}
                onSelectRace={selectRace}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Registration">
            {() =>
              selectedRace ? (
                <Registration
                  race={selectedRace}
                  addDriver={addDriver}
                  removeDriver={removeDriver}
                />
              ) : null
            }
          </Tab.Screen>

          <Tab.Screen name="Timing">
            {() =>
              selectedRace ? (
                <Timing race={selectedRace} onLap={addLapEvent} />
              ) : null
            }
          </Tab.Screen>

          <Tab.Screen name="Results" component={Results} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
