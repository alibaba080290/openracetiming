import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { Race } from '../types';
import { fmt } from '../utils/time';

/* -------------------------------- types ------------------------------- */
interface LapEvent {
  ms: number; // temps absolu depuis t0 (ms)
  driverId?: string; // futur : associer au pilote
}

interface Props {
  selectedRace?: Race; // injecté par le contexte RaceContext
}

/* ------------------------------- helper ------------------------------- */
const now = () => Date.now();

/* --------------------------------- UI --------------------------------- */
const Timing: React.FC<Props> = ({ selectedRace }) => {
  const [laps, setLaps] = useState<LapEvent[]>([]);
  const [started, setStarted] = useState(false);

  // référence sur l’horodatage du départ
  const t0 = useRef<number | null>(null);

  /* -------- callbacks -------- */
  function startRace() {
    t0.current = now();
    setLaps([]);
    setStarted(true);
  }

  function registerLap() {
    if (!started || t0.current == null) {
      return;
    }
    setLaps((prev) => [...prev, { ms: now() - t0.current! }]);
  }

  /* -------- rendering helpers -------- */
  const renderLap = ({ item, index }: { item: LapEvent; index: number }) => (
    <View style={styles.lapItem}>
      <Text>
        Tour {index + 1} – {fmt(item.ms)}
      </Text>
    </View>
  );

  /* -------- no race selected -------- */
  if (!selectedRace) {
    return (
      <View style={styles.container}>
        <Text style={styles.warning}>Aucune course sélectionnée.</Text>
      </View>
    );
  }

  /* ----------------------------- render ----------------------------- */
  return (
    <View style={styles.container}>
      <Text style={styles.raceTitle}>
        {selectedRace.name} —{' '}
        {selectedRace.type === 'endurance'
          ? `${selectedRace.duration} min`
          : `${selectedRace.laps} tours`}
      </Text>

      {started && t0.current && (
        <Text style={styles.globalTime}>
          Temps écoulé : {fmt(now() - t0.current)}
        </Text>
      )}

      {!started ? (
        <Button mode="contained" onPress={startRace} style={styles.btn}>
          Démarrer la course
        </Button>
      ) : (
        <Button mode="contained" onPress={registerLap} style={styles.btn}>
          Enregistrer un passage
        </Button>
      )}

      {laps.length > 0 ? (
        <FlatList
          data={laps}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderLap}
        />
      ) : (
        started && (
          <Text style={styles.emptyHint}>
            Aucun tour enregistré pour l’instant.
          </Text>
        )
      )}
    </View>
  );
};

/* -------------------------------- style -------------------------------- */
const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  btn: { marginVertical: 12 },
  raceTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  globalTime: { fontSize: 16, marginBottom: 12, color: '#0a0' },
  warning: { color: 'red', fontWeight: 'bold', margin: 20 },
  emptyHint: { fontStyle: 'italic', color: '#777', marginTop: 20 },
  lapItem: { padding: 6, borderBottomWidth: 1, borderColor: '#eee' },
});

export default Timing;
