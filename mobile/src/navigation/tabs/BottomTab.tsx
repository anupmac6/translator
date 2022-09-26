import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: 'purple',
      tabBarInactiveTintColor: 'lightgray',
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor:'#fff',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        shadowColor: 'blue',
        shadowOffset: {width:1,height:1},
        shadowRadius: 6,
        shadowOpacity: 0.10,
        height: 88,
        paddingTop:10
      }
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({color,size}) =><Ionicons name="ios-home" size={size} color={color} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen}  options={{tabBarIcon: ({color,size}) =><Ionicons name="ios-list" size={size} color={color} /> }} />
      <Tab.Screen name="Home1" component={HomeScreen}  options={{tabBarIcon: ({color,size}) =><MaterialIcons  name="history" size={size} color={color} /> }} />
      <Tab.Screen name="Profile1" component={ProfileScreen}  options={{tabBarIcon: ({color,size}) =><Ionicons name="ios-settings" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
