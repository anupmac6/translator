import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { useCallback } from 'react';
import Colors from '../../../constants/colors';
import {
  AntDesign,
  Feather,
  Octicons,
  MaterialIcons,
} from '@expo/vector-icons';

interface TranslationCardFooterButtonProps {
  type: 'listen' | 'copy' | 'save' | 'full-screen' | 'share';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const TranslationCardFooterButton = ({
  type,
  onPress,
  style = {},
}: TranslationCardFooterButtonProps) => {
  const getIcon = useCallback(() => {
    switch (type) {
      case 'copy':
        return <AntDesign name="copy1" size={20} color={Colors.white} />;
      case 'listen':
        return <Feather name="volume-2" size={20} color={Colors.white} />;
      case 'save':
        return <AntDesign name="save" size={20} color={Colors.white} />;
      case 'full-screen':
        return <Octicons name="screen-full" size={20} color={Colors.white} />;
      case 'share':
        return (
          <MaterialIcons name="ios-share" size={20} color={Colors.white} />
        );
      default:
        return null;
    }
  }, [type]);
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {getIcon()}
      {/* <Text style={{ marginLeft: 8, color: Colors.white }}>Spanish</Text> */}
    </Pressable>
  );
};

export default TranslationCardFooterButton;

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
