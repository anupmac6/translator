import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from '../tabs/BottomTab';
import TranslateImageScreen from '../../screens/Translate/TranslateImageScreen';
import MainStack from '../stack/MainStack';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="App"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="App" component={MainStack} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({});
