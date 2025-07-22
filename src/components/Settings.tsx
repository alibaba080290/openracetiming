// src/components/Settings.tsx
import React, { useState } from 'react';
import { ScrollView, View, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

import NewRaceForm from './NewRaceForm';
import DeveloperOptions from './DeveloperOptions';

/* ─── Types ────────────────────────────────────────────────────────────── */
interface Race {
  id: string;
  name: string;
  start?: Date | null;
  laps: number;
}

/* ─── Composant ────────────────────────────────────────────────────────── */
const Settings: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [races, setRaces] = useState<Race[]>([]);

  /* Ajoute une course dans le state (remplace plus tard par un appel API) */
  const addRace = (name: string, start: Date | null, laps: number) => {
    setRaces((prev) => [
      ...prev,
      { id: Date.now().toString(), name, start, laps },
    ]);
  };

  /* Tableau des courses existantes -------------------------------------- */
  const raceRows = races.map((race) => (
    <DataTable.Row key={race.id}>
      <DataTable.Cell>{race.name}</DataTable.Cell>
      <DataTable.Cell numeric>{race.laps}</DataTable.Cell>
      <DataTable.Cell>
        {race.start ? race.start.toLocaleString() : '—'}
      </DataTable.Cell>
    </DataTable.Row>
  ));

  /* ─── Rendu ──────────────────────────────────────────────────────────── */
  return (
    <ScrollView contentContainerStyle={{ gap: 24, padding: 16 }}>
      {/* Tableau des courses --------------------------------------------- */}
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Course</DataTable.Title>
            <DataTable.Title numeric>Tours</DataTable.Title>
            <DataTable.Title>Départ</DataTable.Title>
          </DataTable.Header>
          {raceRows}
        </DataTable>
      </View>

      {/* Formulaire nouvelle course -------------------------------------- */}
      <View>
        {showForm ? (
          <NewRaceForm
            onSave={(name, start, laps) => {
              addRace(name, start, laps);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <Button title="Nouvelle course" onPress={() => setShowForm(true)} />
        )}
      </View>

      {/* Options développeur (mode non-prod) ----------------------------- */}
      {process.env.NODE_ENV !== 'production' && (
        <View>
          <DeveloperOptions />
        </View>
      )}
    </ScrollView>
  );
};

export default Settings;
