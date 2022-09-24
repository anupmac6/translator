import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import {useFonts,Karla_200ExtraLight,
  Karla_300Light,
  Karla_400Regular,Karla_500Medium,Karla_600SemiBold,
  Karla_700Bold,Karla_800ExtraBold} from '@expo-google-fonts/karla'
import { useCallback } from 'react';
import { Fonts } from './src/constants/fonts';
import 'react-native-gesture-handler';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/store';


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
    <Provider store={store}>
    <View style={styles.container} onLayout={onLayout}>
    <StatusBar style="auto" />
<Navigation />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
