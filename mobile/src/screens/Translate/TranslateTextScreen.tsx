import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import Colors from '../../constants/colors';
import Style from '../../constants/styles';
import { Fontisto } from '@expo/vector-icons';
import { Fonts } from '../../constants/fonts';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TranslateTextScreen = () => {
  const ref = useRef<TextInput>(null);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.languageSelector}>
          <Text style={styles.language}>English</Text>
          <Fontisto name="arrow-swap" size={24} color={Colors.primary} />
          <Text style={styles.language}>Spanish</Text>
        </View>
        <View style={styles.card}>
          <Pressable
            onPress={() => ref?.current?.focus()}
            style={styles.content}
          >
            <TextInput ref={ref} multiline />
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
      <View style={styles.translated}>
        <View style={styles.translatedContent}>
          <Text style={{ flex: 1, paddingRight: 10, color: Colors.white }}>
            anup anup anup anup anup anup anup anup anup anup anup anup anup
            anup anup anup anup anup anup anup anup anup anup anup anup anup
            anup anup anup anup anup anup anup anup anup anup anup anup anup
            anup anup anup anup anup
          </Text>
          <View style={{}}>
            <AntDesign name="staro" size={24} color={Colors.white} />
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="volume-2" size={20} color={Colors.white} />
            <Text style={{ marginLeft: 8, color: Colors.white }}>Spanish</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="copy1" size={20} color={Colors.white} />
            <Text style={{ marginLeft: 8, color: Colors.white }}>
              Clipboard
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="save" size={20} color={Colors.white} />
            <Text style={{ marginLeft: 8, color: Colors.white }}>Save</Text>
          </View>
        </View>
      </View>
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
});
