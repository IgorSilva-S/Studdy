import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export const colors = {
  lblue: '#deecf5',
  mblue: '#7fabc6',
};

export const fonts = {
  regular: 'fonte',
};

export const images = {
  logo: require('./assets/img/logo.png'),
  buddy: require('./assets/img/buddy.png'),
  check: require('./assets/img/check.png'),
  checklistWhite: require('./assets/img/checklist-white.png'),
  checklist: require('./assets/img/checklist.png'),
  clockWhite: require('./assets/img/clock-white.png'),
  clock: require('./assets/img/clock.png'),
  edit: require('./assets/img/edit.png'),
  mais: require('./assets/img/mais.png'),
  notesWhite: require('./assets/img/notes-white.png'),
  notes: require('./assets/img/notes.png'),
  out: require('./assets/img/out.png'),
  plus: require('./assets/img/plus.png'),
  userWhite: require('./assets/img/user-white.png'),
  user: require('./assets/img/user.png'),
  x: require('./assets/img/x.png'),
  xWhite: require('./assets/img/x-white.png'),
};

export const globalStyles = StyleSheet.create({
  text: {
    color: colors.mblue,
    fontFamily: fonts.regular,
    fontSize: 16,
  }
});

