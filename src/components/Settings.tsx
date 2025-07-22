import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';

import NewRaceForm from './NewRaceForm';
import { useRace } from '../contexts/RaceContext';
import { Race } from '../types';

export default function Settings() {
  const { races, addRace, selectedRace, setSelectedRace } = useRace();
  const [adding, setAdding] = useState(false);

  function handleSave(r: Omit<Race, 'id' | 'drivers'>) {
    addRace(r);
    setAdding(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {adding ? (
        <NewRaceForm onCancel={() => setAdding(false)} onSave={handleSave} />
      ) : (
        <Button title="Nouvelle course" onPress={() => setAdding(true)} />
      )}

      <DataTable style={{ marginTop: 16 }}>
        <DataTable.Header>
          <DataTable.Title style={styles.cell2}>Course</DataTable.Title>
          <DataTable.Title style={styles.cell1}>Type</DataTable.Title>
          <DataTable.Title style={styles.cell12}>Durée / Tours</DataTable.Title>
          <DataTable.Title style={styles.cell18}>Date</DataTable.Title>
        </DataTable.Header>

        {races.map((r) => (
          <TouchableOpacity key={r.id} onPress={() => setSelectedRace(r)}>
            <DataTable.Row
              style={r.id === selectedRace?.id ? styles.selected : undefined}
            >
              <DataTable.Cell style={styles.cell2}>{r.name}</DataTable.Cell>
              <DataTable.Cell style={styles.cell1}>
                {r.type === 'classic' ? 'Classique' : 'Endurance'}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell12}>
                {r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell18}>
                {r.start.toLocaleString()}
              </DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16 },
  cell1: { flex: 1 },
  cell12: { flex: 1.2 },
  cell18: { flex: 1.8 },
  cell2: { flex: 2 },
  selected: { backgroundColor: '#e0f7fa' },
});
