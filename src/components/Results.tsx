import React from 'react';
import { DataTable, Text } from 'react-native-paper';
import { useRace } from '../contexts/RaceContext';
import { fmt } from '../utils/time';

/* ------------- affichage des résultats pour la course sélectionnée ------------- */
export default function Results() {
  const { selectedRace, laps, drivers } = useRace();

  if (!selectedRace) {
    return (
      <Text style={{ padding: 16 }}>Sélectionnez d’abord une course.</Text>
    );
  }

  /* Regrouper les tours par pilote */
  const rows = drivers.map((d) => {
    const lapsForD = laps.filter((l) => l.driverId === d.id);
    const best = Math.min(...lapsForD.map((l) => l.ms));
    const total = lapsForD.reduce((sum, l) => sum + l.ms, 0);
    return { ...d, count: lapsForD.length, best, total };
  });

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Kart / Pilote</DataTable.Title>
        <DataTable.Title numeric>Tours</DataTable.Title>
        <DataTable.Title numeric>Meilleur</DataTable.Title>
        <DataTable.Title numeric>Total</DataTable.Title>
      </DataTable.Header>

      {rows.map((r) => (
        <DataTable.Row key={r.id}>
          <DataTable.Cell>
            #{r.kartNumber} – {r.name}
          </DataTable.Cell>
          <DataTable.Cell numeric>{r.count}</DataTable.Cell>
          <DataTable.Cell numeric>
            {isFinite(r.best) ? fmt(r.best) : '—'}
          </DataTable.Cell>
          <DataTable.Cell numeric>{fmt(r.total)}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
