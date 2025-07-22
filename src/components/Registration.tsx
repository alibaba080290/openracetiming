// src/components/Registration.tsx
import React, { useState } from 'react';
import { ScrollView, View, Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Driver } from '../types';
import NewDriverForm from './NewDriverForm';

const Registration: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [showForm, setShowForm] = useState(false);

  /* Ajout local – remplace-le plus tard par un POST sur ton API */
  const addDriver = (
    name: string,
    kartNumber: number,
    team?: string,
    helmet?: string
  ) => {
    setDrivers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        kartNumber,
        team: team || undefined,
        helmetColor: helmet || undefined,
      },
    ]);
  };

  /* Tableau ----------------------------------------------------------- */
  const rows = drivers.map((d) => (
    <DataTable.Row key={d.id}>
      <DataTable.Cell>{d.name}</DataTable.Cell>
      <DataTable.Cell numeric>{d.kartNumber}</DataTable.Cell>
      <DataTable.Cell>{d.team ?? '—'}</DataTable.Cell>
      <DataTable.Cell>{d.helmetColor ?? '—'}</DataTable.Cell>
    </DataTable.Row>
  ));

  return (
    <ScrollView contentContainerStyle={{ gap: 24, padding: 16 }}>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Pilote</DataTable.Title>
            <DataTable.Title numeric>Kart</DataTable.Title>
            <DataTable.Title>Équipe</DataTable.Title>
            <DataTable.Title>Casque</DataTable.Title>
          </DataTable.Header>
          {rows}
        </DataTable>
      </View>

      {/* Formulaire ---------------------------------------------------- */}
      <View>
        {showForm ? (
          <NewDriverForm
            onSave={(n, k, t, h) => {
              addDriver(n, k, t, h);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <Button title="Ajouter un pilote" onPress={() => setShowForm(true)} />
        )}
      </View>
    </ScrollView>
  );
};

export default Registration;
