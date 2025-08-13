import React from 'react';
import { View, Text, Image } from 'react-native';
import { useFonts } from 'expo-font';
import Menu from './components/menu/index.js';

export default function App() {
  const [fontsLoaded] = useFonts({
    'fonte': require('./assets/fonts/fonte.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
       <Menu size={150} />
  );
}
