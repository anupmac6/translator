import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Karla_200ExtraLight,
  Karla_300Light,
  Karla_400Regular,
  Karla_500Medium,
  Karla_600SemiBold,
  Karla_700Bold,
  Karla_800ExtraBold,
} from '@expo-google-fonts/karla';
import { useCallback, useEffect } from 'react';
import { Fonts } from './src/constants/fonts';
import 'react-native-gesture-handler';
import Navigation from './src/navigation';
import { Provider, useDispatch } from 'react-redux';
import store from './src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import API, { SettingsResponse } from './src/api';
import {
  setShowOnboarding,
  setSourceLanguage,
  setTargetLanguage,
} from './src/store/app/slice';
import { AxiosResponse } from 'axios';
import AppScreen from './src/screens/AppScreen';

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_200ExtraLight,
    Karla_300Light,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
    Karla_800ExtraBold,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AppScreen fontsLoaded={fontsLoaded} />
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
