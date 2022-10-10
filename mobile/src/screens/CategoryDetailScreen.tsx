import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import SearchBar from '../components/shared/SearchBar';
import { Fonts } from '../constants/fonts';
import Colors from '../constants/colors';
import {
  useFocusEffect,
  useIsFocused,
  useRoute,
} from '@react-navigation/native';
import Categories from '../services/Categories';
import { SearchItem } from '../services/History';
import HistoryDetailItem from '../components/HistoryDetailScreen/HistoryDetailItem';

const CategoryDetailScreen = () => {
  const headerHeight = useHeaderHeight();

  const [search, setSearch] = useState('');
  const [categoryItems, setCategoryItems] = useState<SearchItem[]>([]);
  const route = useRoute();

  const isFocused = useIsFocused();

  const categoryId = route.params?.categoryId;
  const categoryName = route.params?.categoryName;

  const loadCategoryItems = useCallback(async () => {
    const data = await Categories.getById(categoryId);

    if (isFocused) {
      setCategoryItems(data);
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      loadCategoryItems();
    }, [loadCategoryItems])
  );

  return (
    <View style={[styles.screen, { marginTop: headerHeight }]}>
      <View style={styles.topHeader}>
        <Text style={styles.header}>{categoryName}</Text>
      </View>

      <FlatList
        data={categoryItems}
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <HistoryDetailItem item={item} />}
      />
    </View>
  );
};

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
  },
  topHeader: {
    marginTop: 10,
    marginBottom: 15,
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
