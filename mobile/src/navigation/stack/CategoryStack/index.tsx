import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from '../../../screens/CategoryScreen';
import CategoryDetailScreen from '../../../screens/CategoryDetailScreen';
import { Fonts } from '../../../constants/fonts';
import Colors from '../../../constants/colors';

const Stack = createNativeStackNavigator();

const CategoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTransparent: true,
          title: '',
          headerBackTitle: 'Categories',
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

export default CategoryStack;

const styles = StyleSheet.create({});
