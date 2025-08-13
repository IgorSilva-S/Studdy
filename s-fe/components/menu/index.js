import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { images } from './../../styles'; 

export default function Menu({ size = 100 }) {
  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={[styles.logo, { width: size, height: size }]}
        resizeMode="contain"
      />
      <Image
        source={images.mais}
        style={[styles.mais, { width: 100, height: 100 }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    marginBottom: 20,
  },
  logo: {
    marginBottom: 20,
  },
  mais: {
    marginBottom: 20,
  },
});
