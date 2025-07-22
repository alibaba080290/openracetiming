import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Race, RaceType } from '../types';

interface Props {
  onCancel: () => void;
  onSave: (race: Race) => void;
}

export default function NewRaceForm({ onCancel, onSave }: Props) {
  // ────────────────────────────────── états
  const [name, setName] = useState('');
  const [type, setType] = useState<RaceType>('classic');
  const [laps, setLaps] = useState('10'); // string pour TextInput
  const [duration, setDuration] = useState('20'); // en minutes
  const [start, setStart] = useState<Date | null>(null);
  const [pickerVis, setPickerVis] = useState(false);

  // ──────────────────────────────── helpers
  const disabled =
    !name.trim() ||
    (type === 'classic' && !+laps) ||
    (type === 'endurance' && !+duration) ||
    !start;

  function formatDateInput(d: Date): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n);
    return (
      d.getFullYear() +
      '-' +
      pad(d.getMonth() + 1) +
      '-' +
      pad(d.getDate()) +
      'T' +
      pad(d.getHours()) +
      ':' +
      pad(d.getMinutes())
    );
  }

  function save() {
    if (!start) {
      return;
    }
    const race: Race = {
      id: Date.now().toString(),
      name,
      type,
      laps: type === 'classic' ? +laps : undefined,
      duration: type === 'endurance' ? +duration : undefined,
      start,
    };
    onSave(race);
  }

  // ──────────────────────────────── rendu
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.label}>Nom de la course</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex. Sprint 12 min"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Type de course</Text>
      <View style={styles.row}>
        <Button
          title="Classique"
          color={type === 'classic' ? '#1976d2' : undefined}
          onPress={() => setType('classic')}
        />
        <View style={{ width: 12 }} />
        <Button
          title="Endurance"
          color={type === 'endurance' ? '#1976d2' : undefined}
          onPress={() => setType('endurance')}
        />
      </View>

      {type === 'classic' ? (
        <>
          <Text style={styles.label}>Nombre de tours</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={laps}
            onChangeText={setLaps}
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Durée (minutes)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />
        </>
      )}

      <Text style={styles.label}>Départ</Text>
      {Platform.OS === 'web' ? (
        <input
          type="datetime-local"
          value={start ? formatDateInput(start) : ''}
          onChange={(e) => {
            setStart(e.target.value ? new Date(e.target.value) : null);
          }}
          style={styles.htmlInput as any}
        />
      ) : (
        <>
          <Button
            title={start ? start.toLocaleString() : 'jj/mm/aaaa  --:--'}
            onPress={() => setPickerVis(true)}
          />
          <DateTimePickerModal
            isVisible={pickerVis}
            mode="datetime"
            onConfirm={(d) => {
              setStart(d);
              setPickerVis(false);
            }}
            onCancel={() => setPickerVis(false)}
          />
        </>
      )}

      <View style={styles.row}>
        <Button title="Annuler" onPress={onCancel} color="#777" />
        <View style={{ width: 12 }} />
        <Button title="Enregistrer" onPress={save} disabled={disabled} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginBottom: 4, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  htmlInput: {
    padding: 8,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    marginBottom: 12,
    width: '100%',
    boxSizing: 'border-box',
  },
});
