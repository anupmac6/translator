import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from '../../../screens/HistoryScreen';
import HistoryDetailScreen from '../../../screens/HistoryDetailScreen';
import { Fonts } from '../../../constants/fonts';
import Colors from '../../../constants/colors';

const Stack = createNativeStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="History"
    >
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetailScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTransparent: true,
          title: '',
          headerBackTitle: 'History',
          headerBackTitleStyle: {
            fontFamily: Fonts.Karla.Bold,
            fontSize: 18,
          },
          headerTintColor: Colors.text,
        }}
      />
    </Stack.Navigator>
  );
};

export default HistoryStack;

const styles = StyleSheet.create({});
