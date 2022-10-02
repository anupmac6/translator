import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Translation } from '../../../services/Translate';
import Colors from '../../../constants/colors';
import Style from '../../../constants/styles';
import { Fonts } from '../../../constants/fonts';

interface AlternateTranslationProps {
  translation: Translation;
}

const AlternateTranslation = ({ translation }: AlternateTranslationProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alternate Translations</Text>

      {translation?.info?.extraTranslations?.map((extraTranslation, index) => (
        <View style={styles.group} key={extraTranslation?.type + index}>
          <Text style={styles.groupHeader}>{extraTranslation?.type}</Text>
          <View style={styles.item}>
            {extraTranslation?.list?.map((listItem, index) => (
              <View key={listItem?.word + index}>
                <Text style={styles.itemLabel}>{listItem?.word}</Text>
                <Text style={styles.itemValue}>
                  {listItem?.meanings?.join(', ')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default AlternateTranslation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    // marginBottom: 30,
    ...Style.dropShadow,
  },
  header: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    color: Colors.primary1,
    marginBottom: 10,
  },
  group: {},
  groupHeader: {
    fontFamily: Fonts.Karla.Medium,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
    color: Colors.gray5,
  },
  item: {
    paddingLeft: 15,
  },
  itemLabel: {
    fontFamily: Fonts.Karla.Regular,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.gray5,
  },
  itemValue: {
    marginVertical: 8,
    fontFamily: Fonts.Karla.Light,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.gray5,
  },
});
