// index.web.js – point d’entrée Expo Web

// 1) Polyfill crypto.getRandomValues (doit être chargé avant tout le reste)
import 'react-native-get-random-values';

// 2) Patch pour React-Navigation (nanoid/non-secure)
import nonSecure from 'nanoid/non-secure'; // la forme “web” retournée par Metro
import { nanoid } from 'nanoid'; // la vraie fonction nommée

if (!nonSecure.nanoid) {
  // Si nonSecure est juste une fonction, on lui ajoute sa propre propriété
  nonSecure.nanoid = nanoid;
}

// 3) Démarrage de l’application
import { registerRootComponent } from 'expo';
import App from './src/App';

registerRootComponent(App);
