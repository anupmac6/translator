import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import SearchBar from "../components/shared/SearchBar";
import { Fonts } from "../constants/fonts";
import Colors from "../constants/colors";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import History, { SearchItem } from "../services/History";
import HistoryDetailItem from "../components/HistoryDetailScreen/HistoryDetailItem";
const HistoryDetailScreen = () => {
  const headerHeight = useHeaderHeight();
  const [search, setSearch] = useState("");
  const [histories, setHistories] = useState<SearchItem[]>([]);
  const route = useRoute();
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const historyId = route?.params?.historyId;
  const historyName = route?.params?.historyName;

  useEffect(() => {
    if (!historyId) {
      navigation.goBack();
    }
  }, []);

  const loadHistory = useCallback(async () => {
    const data = await History.getById(historyId);
    if (isFocused) {
      setHistories(data);
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  return (
    <View style={[styles.screen, { marginTop: headerHeight }]}>
      <View style={styles.topHeader}>
        <Text style={styles.header}>{historyName}</Text>

        <View style={styles.search}>
          <SearchBar value={search} onChange={setSearch} />
        </View>
      </View>

      <FlatList
        data={histories}
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <HistoryDetailItem item={item} key={item.id} />
        )}
      />
    </View>
  );
};

export default HistoryDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
  },
  topHeader: {
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
});
