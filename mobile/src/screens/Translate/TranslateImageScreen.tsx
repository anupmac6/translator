import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';

const { height, width } = Dimensions.get('screen');
const TranslateImageScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>TranslateImageScreen</Text>
    </View>
  );
};

export default TranslateImageScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height / 1.6,
  },
});
