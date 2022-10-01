import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { useCallback } from 'react';
import Colors from '../../constants/colors';
import Style from '../../constants/styles';
import { Fonts } from '../../constants/fonts';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getSourceLanguage, getTargetLanguage } from '../../store/app/slice';
import Loading from './Loading';

interface LanguageSwitcherProps {
  style?: StyleProp<ViewStyle>;
}

const LanguageSwitcher = ({}: LanguageSwitcherProps) => {
  const navigation = useNavigation();

  const sourceLanguage = useSelector(getSourceLanguage);
  const targetLanguage = useSelector(getTargetLanguage);

  const onSourceLangPressHandler = useCallback(() => {
    navigation.navigate('Add', {
      screen: 'LanguageSelector',
      params: {
        languageType: 'source',
      },
    });
  }, [navigation]);

  const onTargetLangPressHandler = useCallback(() => {
    navigation.navigate('Add', {
      screen: 'LanguageSelector',
      params: {
        languageType: 'target',
      },
    });
  }, [navigation]);

  if (!sourceLanguage || !targetLanguage) {
    return <Loading />;
  }

  return (
    <View style={styles.languageSelector}>
      <Pressable onPress={onSourceLangPressHandler}>
        <Text style={styles.language}>{sourceLanguage?.name}</Text>
      </Pressable>
      <Fontisto name="arrow-swap" size={24} color={Colors.primary} />
      <Pressable onPress={onTargetLangPressHandler}>
        <Text style={styles.language}>{targetLanguage?.name}</Text>
      </Pressable>
    </View>
  );
};

export default LanguageSwitcher;

const styles = StyleSheet.create({
  languageSelector: {
    position: 'absolute',
    top: -25,
    width: '80%',
    marginHorizontal: '10%',
    zIndex: 1,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 25,
    ...Style.dropShadow,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  language: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    color: Colors.text,
  },
});
