import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import Style from '../../constants/styles';
import { Fontisto } from '@expo/vector-icons';
import { Fonts } from '../../constants/fonts';
import { Feather, Octicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import LanguageSwitcher from '../../components/shared/LanguageSwitcher';
import { useSelector } from 'react-redux';
import { getSourceLanguage, getTargetLanguage } from '../../store/app/slice';
import Translate, { Translation } from '../../services/Translate';
import Loading from '../../components/shared/Loading';
import TranslationCard from '../../components/shared/TranslationCard/TranslationCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecentSearches from '../../components/TranslateTextScreen/RecentSearches';

const TranslateTextScreen = () => {
  const ref = useRef<TextInput>(null);

  const [text, setText] = useState<string>('');
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const sourceLanguage = useSelector(getSourceLanguage);
  const targetLanguage = useSelector(getTargetLanguage);

  const onSubmitHandler = useCallback(async () => {
    Keyboard.dismiss();

    if (text && sourceLanguage && targetLanguage) {
      setIsTranslating(true);
      const response = await Translate.text(
        sourceLanguage,
        targetLanguage,
        text
      );
      setTranslation(response);
      setIsTranslating(false);
    }
  }, [sourceLanguage, targetLanguage, text]);

  if (!sourceLanguage || !targetLanguage) {
    return <Loading />;
  }
  return (
    <SafeAreaView edges={['right', 'left', 'top']} style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.container}>
            <LanguageSwitcher style={styles.languageSelector} />
            <View style={styles.card}>
              <Pressable
                onPress={() => ref?.current?.focus()}
                style={styles.content}
              >
                <TextInput
                  ref={ref}
                  autoFocus={false}
                  multiline
                  value={text}
                  onChangeText={setText}
                  returnKeyType={'search'}
                  onSubmitEditing={onSubmitHandler}
                  style={styles.textInput}
                />
              </Pressable>
              <View style={styles.footer}>
                <View style={styles.item}>
                  <Feather name="camera" size={20} color={Colors.primary1} />
                  <Text style={styles.itemText}>Camera</Text>
                </View>
                <View style={styles.item}>
                  <FontAwesome
                    name="microphone"
                    size={20}
                    color={Colors.primary1}
                  />
                  <Text style={styles.itemText}>Voice</Text>
                </View>
              </View>
            </View>
          </View>

          {isTranslating && (
            <View style={{ marginTop: 30 }}>
              <Loading />
            </View>
          )}
          {!isTranslating && translation && (
            <TranslationCard
              translation={translation}
              source={sourceLanguage}
              target={targetLanguage}
              query={text}
            />
          )}
          {!isTranslating && !translation && <RecentSearches />}
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TranslateTextScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
  },
  container: {
    marginTop: 30,
    position: 'relative',
  },
  card: {
    minHeight: 200,
    backgroundColor: Colors.white,
    borderRadius: 20,
    ...Style.dropShadow,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 45,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 8,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 14,
    color: Colors.primary1,
    marginTop: 4,
  },
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
  translated: {
    padding: 20,
    backgroundColor: Colors.primary1,
    marginTop: 20,
    borderRadius: 20,
    ...Style.dropShadow,
  },
  translatedContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textInput: {
    fontSize: 22,
    color: Colors.text,
    marginBottom: 15,
  },

  translationText: {
    flex: 1,
    paddingRight: 10,
    fontSize: 22,
    color: Colors.white,
    marginBottom: 15,
  },
});
