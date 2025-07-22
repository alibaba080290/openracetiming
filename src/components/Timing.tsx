import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { Race, LapEvent } from '../types';

interface Props {
  race: Race;
  /** callback parent pour ajouter un passage */
  onLap: (kartNumber?: number) => void;
}

/* utilitaires ─────────────────────────────────────────────────── */
const fmt = (ms: number) => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const c = Math.floor(ms % 1000);
  return `${m}:${s.toString().padStart(2, '0')}.${c
    .toString()
    .padStart(3, '0')}`;
};

const Timing: React.FC<Props> = ({ race, onLap }) => {
  // calcule les temps au tour pour affichage
  const lapRows = useMemo(() => {
    const { lapEvents } = race;
    return lapEvents.map((e, idx): [number, LapEvent, number] => {
      const prev = lapEvents[idx - 1]?.time ?? race.start.getTime();
      return [idx + 1, e, e.time - prev];
    });
  }, [race]);

  const header = `${race.name} – ${
    race.type === 'endurance' ? `${race.duration} min` : `${race.laps} tours`
  }`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{header}</Text>
      <Text style={styles.info}>
        Départ : {race.start.toLocaleString()} | Pilotes : {race.drivers.length}
      </Text>

      <Button mode="contained" onPress={() => onLap()}>
        Enregistrer un passage
      </Button>

      <FlatList
        data={lapRows}
        keyExtractor={([n]) => n.toString()}
        ListHeaderComponent={() =>
          lapRows.length ? (
            <Text style={styles.tableHeader}># Temps tour (m:s.ms)</Text>
          ) : (
            <Text style={styles.noLap}>Aucun tour enregistré.</Text>
          )
        }
        renderItem={({ item: [num, _ev, lapMs] }) => (
          <Text style={styles.row}>
            {num.toString().padStart(3, ' ')}  {fmt(lapMs)}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  info: { color: '#666', marginBottom: 12 },
  tableHeader: { marginTop: 16, fontWeight: 'bold' },
  row: { fontFamily: 'monospace', paddingVertical: 4 },
  noLap: { marginTop: 20, fontStyle: 'italic', color: '#999' },
});

export default Timing;
