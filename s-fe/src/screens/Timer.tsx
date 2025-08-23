import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

export default function Timer() {
  return (
    <View style={styles.container}>
      <Text>Timers</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#deecf5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
