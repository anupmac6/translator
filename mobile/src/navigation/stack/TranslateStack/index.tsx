import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TranslateTextScreen from '../../../screens/Translate/TranslateTextScreen';
import TranslateImageScreen from '../../../screens/Translate/TranslateImageScreen';
import TranslateVoiceScreen from '../../../screens/Translate/TranslateVoiceScreen';

const Stack = createNativeStackNavigator();

const TranslateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="TranslateText" component={TranslateTextScreen} />
      <Stack.Screen name="TranslateImage" component={TranslateImageScreen} />
      <Stack.Screen name="TranslateVoice" component={TranslateVoiceScreen} />
    </Stack.Navigator>
  );
};

export default TranslateStack;

const styles = StyleSheet.create({});
