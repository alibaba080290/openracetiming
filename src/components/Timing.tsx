import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

import { useRace } from '../contexts/RaceContext';

interface Lap {
  stamp: number;
}

export default function Timing() {
  const { selectedRace } = useRace();
  const [laps, setLaps] = useState<Lap[]>([]);

  function addLap() {
    if (selectedRace) {
      setLaps((p) => [...p, { stamp: Date.now() }]);
    }
  }

  function fmt(ms: number) {
    const d = new Date(ms);
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    const cc = String(Math.floor(d.getMilliseconds() / 10)).padStart(2, '0');
    return `${mm}:${ss}.${cc}`;
  }

  if (!selectedRace) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Aucune course sélectionnée</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedRace.name}</Text>

      <Button mode="contained" onPress={addLap} style={styles.btn}>
        Enregistrer un passage
      </Button>

      {laps.length ? (
        <FlatList
          data={laps}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.lapItem}>
              <Text>{`#${index + 1}  ${fmt(item.stamp)}`}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.empty}>Aucun tour enregistré.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  btn: { marginVertical: 12 },
  empty: { fontStyle: 'italic', color: '#777' },
  lapItem: { padding: 6, borderBottomWidth: 1, borderColor: '#eee' },
});
