/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';

/* helper mm:ss.cc --------------------------------------------------------- */
const fmt = (ms: number) => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const c = Math.floor((ms % 1000) / 10);
  return `${m}:${s.toString().padStart(2, '0')}.${c
    .toString()
    .padStart(2, '0')}`;
};

export default function Results() {
  const { selectedRace, drivers } = useRace();

  if (!selectedRace) {
    return null;
  }

  /* Ici il faudrait calculer les classements à partir des tours
     stockés plus tard dans le contexte… pour l’instant maquette vide. */

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Pilote</DataTable.Title>
          <DataTable.Title numeric>Temps total</DataTable.Title>
        </DataTable.Header>

        {drivers.map((d) => (
          <DataTable.Row key={d.id}>
            <DataTable.Cell>{d.name}</DataTable.Cell>
            <DataTable.Cell numeric>{fmt(0)}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}
