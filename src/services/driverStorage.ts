import AsyncStorage from '@react-native-async-storage/async-storage';
import { Driver } from '../types';

const KEY = 'drivers';

export async function loadDrivers(): Promise<Driver[]> {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveDrivers(list: Driver[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}
