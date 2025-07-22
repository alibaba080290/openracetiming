/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';
import uuid from 'react-native-uuid';

import NewRaceForm from './NewRaceForm';
import { useRace } from '../contexts/RaceContext';
import { Race } from '../types';

export default function Settings() {
  const { races, addRace, selectRace, selectedRace } = useRace();
  const [adding, setAdding] = useState(false);

  /* ---------- helpers -------------------------------------------------- */
  const handleSave = (partial: Omit<Race, 'id'>) => {
    addRace({ id: uuid.v4().toString(), ...partial });
    setAdding(false);
  };

  /* ---------- rendu ---------------------------------------------------- */
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {!adding && (
        <Button mode="contained" onPress={() => setAdding(true)}>
          Nouvelle course
        </Button>
      )}

      {adding && (
        <NewRaceForm onSave={handleSave} onCancel={() => setAdding(false)} />
      )}

      <DataTable style={{ marginTop: 16 }}>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 2 }}>Course</DataTable.Title>
          <DataTable.Title style={{ flex: 1 }}>Type</DataTable.Title>
          <DataTable.Title style={{ flex: 1 }} numeric>
            Durée/Tours
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1.2 }}>Date</DataTable.Title>
          <DataTable.Title style={{ flex: 0.4 }} />
        </DataTable.Header>

        {races.map((r) => {
          const isSel = r.id === selectedRace?.id;
          return (
            <DataTable.Row
              key={r.id}
              style={{ backgroundColor: isSel ? '#eef' : undefined }}
            >
              <DataTable.Cell style={{ flex: 2 }}>{r.name}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                {r.type === 'classic' ? 'Classique' : 'Endurance'}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }} numeric>
                {r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1.2 }}>
                {r.start.toLocaleString()}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.4 }}>
                <IconButton
                  icon="check"
                  size={18}
                  onPress={() => selectRace(r.id)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}
