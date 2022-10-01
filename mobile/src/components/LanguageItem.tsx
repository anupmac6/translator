import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import Colors from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import Style from '../constants/styles';
interface LanguageItemProps {
  title: string;
  onPress?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  selected?: boolean;
}
const LanguageItem = ({
  title,
  onPress,
  isFirst,
  isLast,
  selected,
}: LanguageItemProps) => {
  const onPressHandler = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);
  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) => [
        styles.container,
        isFirst && styles.firstItem,
        isLast && styles.lastItem,
        pressed && onPress && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
      {selected && (
        <Ionicons name="checkmark-sharp" size={24} color={Colors.text} />
      )}
    </Pressable>
  );
};

export default LanguageItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: Fonts.Karla.Medium,
    fontSize: 16,
    color: Colors.text,
  },
  firstItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
