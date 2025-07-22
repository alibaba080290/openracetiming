/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

import { useRace } from '../contexts/RaceContext';

interface Lap {
  ts: number; // horodate en ms
  kart?: number;
}

/* util fond : format mm:ss.cc */
const fmt = (ms: number) => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const c = Math.floor((ms % 1000) / 10);
  return `${m}:${s.toString().padStart(2, '0')}.${c
    .toString()
    .padStart(2, '0')}`;
};

export default function Timing() {
  const { selectedRace } = useRace();
  const [laps, setLaps] = useState<Lap[]>([]);
  const [start, setStart] = useState<number | null>(null);

  if (!selectedRace) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Aucune course sélectionnée.</Text>
      </View>
    );
  }

  /* --- handlers -------------------------------------------------------- */
  const begin = () => {
    // compte à rebours 10 s puis top départ
    setTimeout(() => setStart(Date.now()), 10_000);
  };

  const addLap = () => {
    if (!start) {
      return;
    }
    setLaps((prev) => [...prev, { ts: Date.now() }]);
  };

  /* --- rendu ----------------------------------------------------------- */
  const raceClock = start === null ? '--:--.--' : fmt(Date.now() - start);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{selectedRace.name}</Text>
      <Text style={styles.h2}>Horloge : {raceClock}</Text>

      <Button mode="contained" onPress={begin} disabled={start !== null}>
        DÉMARRER (10 s)
      </Button>

      <Button
        mode="contained"
        onPress={addLap}
        disabled={!start}
        style={{ marginTop: 8 }}
      >
        Enregistrer un tour
      </Button>

      <FlatList
        data={laps}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => {
          const prevTs = index === 0 ? start! : laps[index - 1].ts;
          const lapTime = fmt(item.ts - prevTs);
          return (
            <Text style={styles.line}>
              Tour {index + 1} : {lapTime}
            </Text>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  h1: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  h2: { fontSize: 16, marginBottom: 16 },
  line: { paddingVertical: 4, borderBottomWidth: 1, borderColor: '#eee' },
});
