import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

interface SearchBarProps {
  onFocus?: () => void;
  onBlur?: () => void;
  value?: string | undefined;
  onChange?: (value: string) => void;
}

const SearchBar = ({ onFocus, onBlur, onChange, value }: SearchBarProps) => {
  const textInputRef = useRef<TextInput>(null);
  const onPressHandler = useCallback(() => {
    textInputRef.current?.focus();
    if (onFocus) {
      onFocus();
    }
  }, [textInputRef, onFocus]);

  const onBlurHandler = useCallback(() => {
    if (onBlur) {
      onBlur();
    }
  }, [onBlur]);

  return (
    <Pressable onPress={onPressHandler} style={styles.container}>
      <Feather name="search" size={16} color={Colors.text} />
      <TextInput
        ref={textInputRef}
        style={styles.text}
        value={value}
        onChangeText={onChange}
        placeholder="Search"
        placeholderTextColor={Colors.gray5}
      />
    </Pressable>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.gray7,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  text: {
    lineHeight: 20,
    fontFamily: Fonts.Karla.Medium,
    fontSize: 16,
    marginLeft: 8,
  },
});
