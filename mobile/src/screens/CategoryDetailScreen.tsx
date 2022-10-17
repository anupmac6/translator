import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import SearchBar from '../components/shared/SearchBar';
import { Fonts } from '../constants/fonts';
import Colors from '../constants/colors';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Categories from '../services/Categories';
import { SearchItem } from '../services/History';
import HistoryDetailItem from '../components/HistoryDetailScreen/HistoryDetailItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CategoryDetailScreen = () => {
  const headerHeight = useHeaderHeight();

  const [search, setSearch] = useState('');
  const [categoryItems, setCategoryItems] = useState<SearchItem[]>([]);
  const route = useRoute();
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const categoryId = route.params?.categoryId;
  const categoryName = route.params?.categoryName;
  const onPressHandler = useCallback(() => {
    navigation.navigate('Quiz', {
      categoryId,
    });
  }, [navigation, categoryId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={onPressHandler} style={{ paddingHorizontal: 20 }}>
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={24}
              color={Colors.text}
            />
          </Pressable>
        );
      },
    });
  }, [navigation, onPressHandler]);

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
        renderItem={({ item, index }) => (
          <HistoryDetailItem item={item} onPress={onPressHandler} />
        )}
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
