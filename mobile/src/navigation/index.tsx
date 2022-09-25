import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stack/AuthStack';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getShowOnboarding } from '../store/app/slice';
import OnboardingStack from './stack/OnboardingStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTab from './tabs/BottomTab';

const Navigation = () => {
  const showOnboarding = useSelector(getShowOnboarding);
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {showOnboarding && <OnboardingStack />}
        {!showOnboarding && !isLoggedIn && <AuthStack />}
        {!showOnboarding && isLoggedIn && <BottomTab />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
