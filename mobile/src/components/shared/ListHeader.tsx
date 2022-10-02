import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Fonts } from '../../constants/fonts';
import Colors from '../../constants/colors';

interface ListHeaderProps {
  title: string;
}

const ListHeader = ({ title }: ListHeaderProps) => {
  if (!title) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  text: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.text,
  },
});
