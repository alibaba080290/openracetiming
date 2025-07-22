import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

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
  const [helmet, setHelmet] = useState('');

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nom pilote"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="N° kart"
        keyboardType="numeric"
        value={kart}
        onChangeText={setKart}
      />
      <TextInput
        style={styles.input}
        placeholder="Équipe (optionnel)"
        value={team}
        onChangeText={setTeam}
      />
      <TextInput
        style={styles.input}
        placeholder="Couleur casque (optionnel)"
        value={helmet}
        onChangeText={setHelmet}
      />

      <View style={styles.row}>
        <Button title="Annuler" onPress={onCancel} />
        <Button
          title="Enregistrer"
          onPress={() => onSave(name, Number(kart), team, helmet)}
        />
      </View>
    </View>
  );
};

export default NewDriverForm;

const styles = StyleSheet.create({
  form: { gap: 8, padding: 8, backgroundColor: '#fafafa', borderRadius: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 40,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});
