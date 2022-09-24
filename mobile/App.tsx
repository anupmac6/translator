import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import {useFonts,Karla_200ExtraLight,
  Karla_300Light,
  Karla_400Regular,Karla_500Medium,Karla_600SemiBold,
  Karla_700Bold,Karla_800ExtraBold} from '@expo-google-fonts/karla'
import { useCallback } from 'react';
import { Fonts } from './src/constants/fonts';

  SplashScreen.preventAutoHideAsync()
export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_200ExtraLight,
    Karla_300Light,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
    Karla_800ExtraBold
  })

  const onLayout = useCallback(async() => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  },[fontsLoaded])

  if(!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text style={{fontFamily:Fonts.Karla.Medium}}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
