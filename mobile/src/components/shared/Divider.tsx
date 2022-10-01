import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';

const Divider = () => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginHorizontal: 10,
        }}
      ></View>
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({});
