import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Fonts } from '../../constants/fonts';
import Colors from '../../constants/colors';
import { SearchItem } from '../../services/History';
import { useSelector } from 'react-redux';
import { getLanguageByCode } from '../../store/data/slice';

interface HistoryDetailItemProps {
  item: SearchItem;
  onPress?: () => void;
}
const HistoryDetailItem = ({
  item,
  onPress = () => {},
}: HistoryDetailItemProps) => {
  const sourceLang = useSelector(getLanguageByCode(item?.sourceLang));
  const targetLang = useSelector(getLanguageByCode(item?.targetLang));
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.section}>
        <Text style={styles.language}>{sourceLang}</Text>
        <Text style={styles.text}>{item?.search?.trim()}</Text>
      </View>
      <View style={[styles.section, styles.sectionTargetLang]}>
        <Text style={[styles.language, styles.targetLang]}>{targetLang}</Text>
        <Text style={[styles.text, styles.targetLang]}>
          {item?.translation?.trim()}
        </Text>
      </View>
    </Pressable>
  );
};

export default HistoryDetailItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  section: {},
  sectionTargetLang: {
    marginTop: 5,
  },
  language: {
    fontFamily: Fonts.Karla.Regular,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  text: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 18,
    color: Colors.text,
  },
  targetLang: {
    color: Colors.primary1,
  },
});
