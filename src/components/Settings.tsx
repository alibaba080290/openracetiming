import React, { useState } from 'react';
import { ScrollView, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

import NewRaceForm from './NewRaceForm';
import { Race } from '../types';

export default function Settings() {
  const [races, setRaces] = useState<Race[]>([]);
  const [adding, setAdding] = useState(false);

  // ─────────────────────────── helpers
  function addRace(r: Race) {
    setRaces((prev) => [...prev, r]);
    setAdding(false);
  }

  // ─────────────────────────── rendu
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {!adding && (
        <Button title="Nouvelle course" onPress={() => setAdding(true)} />
      )}

      {adding && (
        <NewRaceForm onCancel={() => setAdding(false)} onSave={addRace} />
      )}

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Course</DataTable.Title>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title numeric>Durée/Tours</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {races.map((r) => (
          <DataTable.Row key={r.id}>
            <DataTable.Cell>{r.name}</DataTable.Cell>
            <DataTable.Cell>
              {r.type === 'classic' ? 'Classique' : 'Endurance'}
            </DataTable.Cell>
            <DataTable.Cell numeric>
              {r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`}
            </DataTable.Cell>
            <DataTable.Cell>{r.start.toLocaleString()}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}
