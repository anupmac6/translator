import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import AddButton from '../../components/BottomTabs/AddButton';
import TranslateStack from '../stack/TranslateStack';
import Style from '../../constants/styles';
import HistoryScreen from '../../screens/HistoryScreen';
import HistoryStack from '../stack/HistoryStack';
import FavoriteScreen from '../../screens/FavoriteScreen';
import CategoryScreen from '../../screens/CategoryScreen';
import CategoryStack from '../stack/CategoryStack';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary1,
        tabBarInactiveTintColor: Colors.gray,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          height: 88,
          paddingTop: 10,
          ...Style.dropShadow,
        },
        headerBackgroundContainerStyle: { backgroundColor: 'red' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="list"
        component={CategoryStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={TranslateStack}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarButton: () => <AddButton />,
        }}
      />
      <Tab.Screen
        name="Home1"
        component={HistoryStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="star" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
