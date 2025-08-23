import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import RootNav from './src/routes/drawer';

export default function App() {
  return (
    <RootNav/>
  );
}
