import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { Race, Driver } from '../types';

interface Props {
  race: Race;
  addDriver: (d: Driver) => void;
  removeDriver: (driverId: string) => void;
}

const Registration: React.FC<Props> = ({ race, addDriver, removeDriver }) => {
  const [name, setName] = useState('');
  const [kartNumber, setKart] = useState('');

  const handleAdd = () => {
    if (!name.trim() || !kartNumber) {
      return;
    }
    addDriver({
      id: uuid.v4().toString(),
      name: name.trim(),
      kartNumber: Number(kartNumber),
    });
    setName('');
    setKart('');
  };

  const renderItem = ({ item }: { item: Driver }) => (
    <List.Item
      title={`${item.kartNumber} – ${item.name}`}
      right={() => (
        <IconButton
          icon="delete"
          onPress={() => removeDriver(item.id)}
          size={20}
        />
      )}
    />
  );

  return (
    <View style={styles.container}>
      {/* Formulaire d’ajout */}
      <View style={styles.row}>
        <TextInput
          placeholder="Nom pilote"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Kart #"
          style={[styles.input, { maxWidth: 80 }]}
          value={kartNumber}
          keyboardType="number-pad"
          onChangeText={setKart}
        />
        <Button title="Ajouter" onPress={handleAdd} />
      </View>

      {/* Liste pilotes */}
      <FlatList
        data={race.drivers}
        keyExtractor={(d) => d.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <List.Item title="Aucun pilote enregistré." disabled />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
});

export default Registration;
