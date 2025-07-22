import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from './components/Settings';
import Registration from './components/Registration';
import Timing from './components/Timing';
import Results from './components/Results';
import { RaceProvider } from './contexts/RaceContext';

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, height: 80 }}
      source={require('./ORT_Header.png')}
    />
  );
}

export default function App() {
  return (
    <RaceProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { height: 80 },
            headerTitle: (p) => <LogoTitle {...p} />,
          }}
        >
          <Tab.Screen name="Settings" component={Settings} />
          <Tab.Screen name="Registration" component={Registration} />
          <Tab.Screen name="Timing" component={Timing} />
          <Tab.Screen name="Results" component={Results} />
        </Tab.Navigator>
      </NavigationContainer>
    </RaceProvider>
  );
}
