import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  console.log('home screen');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
