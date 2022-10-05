import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stack/AuthStack';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getShowOnboarding } from '../store/app/slice';
import OnboardingStack from './stack/OnboardingStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppDrawer from './drawer/AppDrawer';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AddBottomSheet from '../components/BottomTabs/AddBottomSheet';
import CategoryBottomSheet from '../components/CategoryBottomSheet';

const Navigation = () => {
  const showOnboarding = useSelector(getShowOnboarding);
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <NavigationContainer>
          {showOnboarding && <OnboardingStack />}
          {!showOnboarding && !isLoggedIn && <AuthStack />}
          {!showOnboarding && isLoggedIn && <AppDrawer />}
          <AddBottomSheet />
          <CategoryBottomSheet />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
