import React, { useState } from 'react';
import { ScrollView, Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import NewRaceForm from './NewRaceForm';
import { Race } from '../types';

interface SettingsProps {
  races: Race[];
  addRace: (race: Race) => void;
  selectedRace?: Race;
  onSelectRace: (race: Race) => void;
}

const Settings: React.FC<SettingsProps> = ({
  races,
  addRace,
  selectedRace,
  onSelectRace,
}) => {
  const [adding, setAdding] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Bouton / Formulaire d’ajout */}
      {!adding ? (
        <Button title="Nouvelle course" onPress={() => setAdding(true)} />
      ) : (
        <NewRaceForm
          onCancel={() => setAdding(false)}
          onSave={(race) => {
            addRace(race);
            setAdding(false);
          }}
        />
      )}

      {/* Tableau des courses */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Course</DataTable.Title>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title numeric>Durée/Tours</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {races.map((r) => (
          <DataTable.Row
            key={r.id}
            onPress={() => onSelectRace(r)}
            style={
              selectedRace?.id === r.id
                ? { backgroundColor: '#c2e7ff' } // surbrillance
                : undefined
            }
          >
            <DataTable.Cell>{r.name}</DataTable.Cell>
            <DataTable.Cell>
              {r.type === 'classic' ? 'Classique' : 'Endurance'}
            </DataTable.Cell>
            <DataTable.Cell numeric>
              {r.type === 'classic' ? `${r.laps} tours` : `${r.duration} min`}
            </DataTable.Cell>
            <DataTable.Cell>
              {new Date(r.start).toLocaleString()}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

export default Settings;
