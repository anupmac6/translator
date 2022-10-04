import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../constants/fonts';
import Colors from '../constants/colors';
import SearchBar from '../components/shared/SearchBar';
import Style from '../constants/styles';
import { AntDesign } from '@expo/vector-icons';
import History, { HistoryItem } from '../services/History';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

const HistoryScreen = () => {
  const [search, setSearch] = useState<string>('');

  const [histories, setHistories] = useState<HistoryItem[]>([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const loadHistory = useCallback(async () => {
    const data = await History.get();
    if (isFocused) {
      setHistories(data);
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const onPressHandler = useCallback(
    (history: HistoryItem) => {
      navigation.navigate('HistoryDetail', {
        historyId: history.id,
        historyName: history.name,
      });
    },
    [navigation]
  );

  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={styles.screen}>
      <View>
        <Text style={styles.header}>History</Text>
      </View>
      <View style={styles.search}>
        <SearchBar value={search} onChange={setSearch} />
      </View>

      <FlatList
        data={histories}
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => onPressHandler(item)}
            key={item.id}
            style={[styles.history, index === 0 && { marginTop: 20 }]}
          >
            <View style={styles.label}>
              <AntDesign name="folderopen" size={20} color={Colors.primary1} />
              <Text style={styles.labelText}>{item.name}</Text>
            </View>
            <View style={styles.leftLabel}>
              <Text style={styles.leftLabelText}>{item.itemCount}</Text>
              <AntDesign name="right" size={16} color={Colors.gray5} />
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },
  header: {
    fontFamily: Fonts.Karla.ExtraBold,
    fontSize: 24,
    lineHeight: 30,
    color: Colors.text,
  },
  search: {
    marginTop: 15,
  },
  history: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 15,
    borderRadius: 10,
    ...Style.dropShadow,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    marginLeft: 15,
    fontFamily: Fonts.Karla.Bold,
    fontSize: 17,
    color: Colors.text,
  },
  leftLabel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftLabelText: {
    marginRight: 8,
    fontFamily: Fonts.Karla.Regular,
    fontSize: 20,
    color: Colors.text,
  },
});
