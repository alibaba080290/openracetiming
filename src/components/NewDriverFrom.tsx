// src/components/NewDriverForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  onSave: (
    name: string,
    kartNumber: number,
    team?: string,
    helmet?: string
  ) => void;
  onCancel: () => void;
}

const NewDriverForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [kart, setKart] = useState('');
  const [team, setTeam] = useState('');
  const [helmetColor, setHelmetColor] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pilote</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nom complet"
      />

      <Text style={styles.label}>N° kart</Text>
      <TextInput
        style={styles.input}
        value={kart}
        onChangeText={setKart}
        keyboardType="numeric"
        placeholder="7"
      />

      <Text style={styles.label}>Équipe (option)</Text>
      <TextInput
        style={styles.input}
        value={team}
        onChangeText={setTeam}
        placeholder="Fun Racers"
      />

      <Text style={styles.label}>Couleur casque (option)</Text>
      <TextInput
        style={styles.input}
        value={helmetColor}
        onChangeText={setHelmetColor}
        placeholder="Rouge"
      />

      <View style={styles.actions}>
        <Button title="Annuler" onPress={onCancel} color="#777" />
        <Button
          title="Enregistrer"
          onPress={() =>
            onSave(name.trim(), Number(kart), team.trim(), helmetColor.trim())
          }
          disabled={!name.trim() || !kart}
        />
      </View>
    </View>
  );
};

export default NewDriverForm;

const styles = StyleSheet.create({
  container: { gap: 12, padding: 16 },
  label: { fontWeight: '600', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
