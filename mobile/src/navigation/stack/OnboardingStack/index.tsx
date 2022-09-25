import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../../../screens/Onboarding/Onboarding';

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingOne" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;

const styles = StyleSheet.create({});
