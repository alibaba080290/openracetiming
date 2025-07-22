// src/components/NewRaceForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props {
  onSave: (name: string, start: Date | null, laps: number) => void;
  onCancel: () => void;
}

const NewRaceForm: React.FC<Props> = ({ onSave, onCancel }) => {
  /* ─── États locaux ─────────────────────────────────────────────────── */
  const [raceName, setRaceName] = useState('');
  const [laps, setLaps] = useState('10');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  /* ─── Handlers ─────────────────────────────────────────────────────── */
  const confirmDate = (date: Date) => {
    setStartTime(date);
    setShowPicker(false);
  };

  const handleSave = () => {
    onSave(raceName.trim(), startTime, Number(laps) || 0);
  };

  /* ─── Rendu ────────────────────────────────────────────────────────── */
  return (
    <View style={styles.container}>
      {/* Nom ------------------------------------------------------------- */}
      <Text style={styles.label}>Nom de la course</Text>
      <TextInput
        style={styles.input}
        value={raceName}
        onChangeText={setRaceName}
        placeholder="Ex. Sprint 12 min"
      />

      {/* Tours ----------------------------------------------------------- */}
      <Text style={styles.label}>Nombre de tours</Text>
      <TextInput
        style={styles.input}
        value={laps}
        keyboardType="numeric"
        onChangeText={setLaps}
        placeholder="10"
      />

      {/* Date & heure ---------------------------------------------------- */}
      <Text style={styles.label}>Départ</Text>

      {/* Web : champ HTML5 datetime-local */}
      {Platform.OS === 'web' && (
        <input
          type="datetime-local"
          style={styles.webDateInput as any}
          value={
            startTime
              ? new Date(
                  startTime.getTime() - startTime.getTimezoneOffset() * 60000
                )
                  .toISOString()
                  .slice(0, 16)
              : ''
          }
          onChange={(e) =>
            setStartTime(e.target.value ? new Date(e.target.value) : null)
          }
        />
      )}

      {/* Mobile natif : modal */}
      {Platform.OS !== 'web' && (
        <>
          <Button
            title={
              startTime
                ? startTime.toLocaleString()
                : 'Choisir la date et l’heure'
            }
            onPress={() => setShowPicker(true)}
          />
          <DateTimePickerModal
            isVisible={showPicker}
            mode="datetime"
            date={startTime || new Date()}
            onConfirm={confirmDate}
            onCancel={() => setShowPicker(false)}
          />
        </>
      )}

      {/* Actions --------------------------------------------------------- */}
      <View style={styles.actions}>
        <Button title="Annuler" onPress={onCancel} color="#777" />
        <Button
          title="Enregistrer"
          onPress={handleSave}
          disabled={!raceName.trim()}
        />
      </View>
    </View>
  );
};

export default NewRaceForm;

/* ─── Styles ──────────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
  },
  webDateInput: {
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
