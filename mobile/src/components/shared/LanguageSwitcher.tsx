import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import Colors from '../../constants/colors';
import Style from '../../constants/styles';
import { Fonts } from '../../constants/fonts';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSourceLanguage,
  getTargetLanguage,
  setSourceLanguage,
  setTargetLanguage,
} from '../../store/app/slice';
import Loading from './Loading';
import Languages from '../../services/Languages';

interface LanguageSwitcherProps {
  style?: StyleProp<ViewStyle>;
}

const LanguageSwitcher = ({}: LanguageSwitcherProps) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sourceLanguage = useSelector(getSourceLanguage);
  const targetLanguage = useSelector(getTargetLanguage);

  const dispatch = useDispatch();

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

  const onToggleLanguages = useCallback(async () => {
    if (sourceLanguage && targetLanguage) {
      setIsLoading(true);
      await Languages.toggleLanguages(targetLanguage, sourceLanguage);
      dispatch(setSourceLanguage(targetLanguage?.code));
      dispatch(setTargetLanguage(sourceLanguage?.code));
      setIsLoading(false);
    }
  }, [sourceLanguage, targetLanguage]);

  if (!sourceLanguage || !targetLanguage) {
    return <Loading />;
  }

  return (
    <View style={styles.languageSelector}>
      <Pressable onPress={onSourceLangPressHandler} style={styles.pill}>
        <Text style={styles.language}>{sourceLanguage?.name}</Text>
      </Pressable>
      <Pressable onPress={onToggleLanguages} style={styles.toggle}>
        {isLoading && <Loading />}
        {!isLoading && (
          <Fontisto name="arrow-swap" size={24} color={Colors.primary} />
        )}
      </Pressable>
      <Pressable onPress={onTargetLangPressHandler} style={styles.pill}>
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
  },
  pill: {
    width: '50%',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  toggle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  language: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    color: Colors.text,
  },
});
