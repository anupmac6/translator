import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { Fonts } from '../../constants/fonts';
import Colors from '../../constants/colors';

interface HeaderButtonProps {
  title: string;
  onPress?: () => void;
}
const HeaderButton = ({ title, onPress }: HeaderButtonProps) => {
  const onPressHandler = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);
  return (
    <Pressable style={styles.container} onPress={onPressHandler}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  container: {},
  text: {
    fontFamily: Fonts.Karla.Medium,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.text,
  },
});
