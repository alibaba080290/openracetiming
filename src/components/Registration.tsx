/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import uuid from 'react-native-uuid';

import { useRace } from '../contexts/RaceContext';

export default function Registration() {
  const { selectedRace, drivers, updateDrivers } = useRace();
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [kart, setKart] = useState('');

  if (!selectedRace) {
    return (
      <View style={styles.center}>
        <List.Item title="Aucune course sélectionnée." />
      </View>
    );
  }

  const add = () =>
    updateDrivers((prev) => [
      ...prev,
      { id: uuid.v4().toString(), name, team, kartNumber: Number(kart) },
    ]);

  const remove = (id: string) =>
    updateDrivers((prev) => prev.filter((d) => d.id !== id));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom pilote"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Équipe"
        value={team}
        onChangeText={setTeam}
      />
      <TextInput
        style={styles.input}
        placeholder="Kart #"
        value={kart}
        onChangeText={setKart}
        keyboardType="numeric"
      />

      <Button title="Ajouter pilote" onPress={add} />

      <FlatList
        data={drivers}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <List.Item
            title={`${item.kartNumber ?? '?'} – ${item.name}`}
            description={item.team}
            right={() => (
              <IconButton icon="delete" onPress={() => remove(item.id)} />
            )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginVertical: 6,
    padding: 8,
  },
});
