import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import uuid from 'react-native-uuid';

import { useRace } from '../contexts/RaceContext';
import { Driver } from '../types';

export default function Registration() {
  const { selectedRace, updateDrivers } = useRace();

  const [name, setName] = useState('');
  const [kart, setKart] = useState('');
  const [team, setTeam] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>([]);

  /* sync local state when course changes */
  useEffect(() => setDrivers(selectedRace?.drivers ?? []), [selectedRace]);

  if (!selectedRace) {
    return (
      <List.Section>
        <List.Item title="Aucune course sélectionnée" />
      </List.Section>
    );
  }

  function add() {
    if (!name || !kart) {
      return;
    }
    const d: Driver = {
      id: uuid.v4().toString(),
      name,
      kartNumber: +kart,
      team,
    };
    const next = [...drivers, d];
    setDrivers(next);
    updateDrivers(selectedRace.id, next);
    setName('');
    setKart('');
    setTeam('');
  }

  function remove(id: string) {
    const next = drivers.filter((d) => d.id !== id);
    setDrivers(next);
    updateDrivers(selectedRace.id, next);
  }

  return (
    <View style={styles.container}>
      <View style={styles.formRow}>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.inputS}
          placeholder="Kart#"
          value={kart}
          onChangeText={setKart}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Équipe"
          value={team}
          onChangeText={setTeam}
        />
        <Button title="Ajouter" onPress={add} />
      </View>

      <FlatList
        data={drivers}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <List.Item
            title={`${item.kartNumber} – ${item.name}`}
            description={item.team ?? '—'}
            right={() => (
              <IconButton icon="close" onPress={() => remove(item.id)} />
            )}
          />
        )}
        ListEmptyComponent={<List.Item title="Aucun pilote" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  formRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    padding: 4,
  },
  inputS: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    padding: 4,
    textAlign: 'center',
  },
});
