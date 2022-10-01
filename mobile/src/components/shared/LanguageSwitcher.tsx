import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';
import Style from '../../constants/styles';
import { Fonts } from '../../constants/fonts';
import { Fontisto } from '@expo/vector-icons';

interface LanguageSwitcherProps {
  style?: StyleProp<ViewStyle>;
}

const LanguageSwitcher = ({}: LanguageSwitcherProps) => {
  return (
    <View style={styles.languageSelector}>
      <Text style={styles.language}>English</Text>
      <Fontisto name="arrow-swap" size={24} color={Colors.primary} />
      <Text style={styles.language}>Spanish</Text>
    </View>
  );
};

export default LanguageSwitcher;

const styles = StyleSheet.create({
  languageSelector: {
    position: 'absolute',
    top: -25,
    width: '80%',
    marginHorizontal: '10%',
    zIndex: 1,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 25,
    ...Style.dropShadow,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  language: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    color: Colors.text,
  },
});
