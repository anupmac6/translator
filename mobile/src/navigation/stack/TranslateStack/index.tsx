import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TranslateTextScreen from '../../../screens/Translate/TranslateTextScreen';
import TranslateImageScreen from '../../../screens/Translate/TranslateImageScreen';
import TranslateVoiceScreen from '../../../screens/Translate/TranslateVoiceScreen';
import LanguageSelectorScreen from '../../../screens/Translate/LanguageSelectorScreen';
import { Fonts } from '../../../constants/fonts';
import Colors from '../../../constants/colors';

const Stack = createNativeStackNavigator();

const TranslateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="TranslateText" component={TranslateTextScreen} />
      <Stack.Screen name="TranslateImage" component={TranslateImageScreen} />
      <Stack.Screen name="TranslateVoice" component={TranslateVoiceScreen} />
      <Stack.Screen
        name="LanguageSelector"
        component={LanguageSelectorScreen}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          animation: 'default',
          title: 'Select Languages',
          headerShown: true,
          headerTitleStyle: {
            fontFamily: Fonts.Karla.Bold,
            fontSize: 18,
            color: Colors.text,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default TranslateStack;

const styles = StyleSheet.create({});
