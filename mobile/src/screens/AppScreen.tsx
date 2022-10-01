import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch } from 'react-redux';
import API, { SettingsResponse } from '../api';
import {
  setShowOnboarding,
  setSourceLanguage,
  setTargetLanguage,
} from '../store/app/slice';
import { StatusBar } from 'expo-status-bar';
import Navigation from '../navigation';
import Settings from '../services/Settings';
import Languages from '../services/Languages';
import { useIsFocused } from '@react-navigation/native';
import { setLanguages } from '../store/data/slice';

interface AppScreenProps {
  fontsLoaded: boolean;
}

const AppScreen = ({ fontsLoaded }: AppScreenProps) => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };
  useEffect(() => {
    if (fontsLoaded && dataLoaded) {
      hideSplashScreen();
    }
  }, [fontsLoaded, dataLoaded]);

  const dispatch = useDispatch();

  //settings
  const loadSettings = useCallback(async () => {
    const settings = await Settings.get();
    console.log(settings);
    dispatch(setShowOnboarding(settings?.showOnboarding));
    dispatch(setSourceLanguage(settings?.sourceLang));
    dispatch(setTargetLanguage(settings?.targetLang));

    setDataLoaded(true);
  }, []);

  //languages
  const loadLanguages = useCallback(async () => {
    const response = await Languages.get();
    dispatch(setLanguages(response?.languages));
  }, []);

  const loadData = useCallback(async () => {
    loadSettings();
    loadLanguages();
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navigation />
    </View>
  );
};

export default AppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
