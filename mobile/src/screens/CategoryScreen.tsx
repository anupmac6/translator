import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../constants/fonts';
import Colors from '../constants/colors';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Categories, { Category } from '../services/Categories';
import CategoryItem from '../components/CategoryScreen/CategoryItem';

const CategoryScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const loadCategories = useCallback(async () => {
    const data = await Categories.get();
    console.log(data);
    if (isFocused) {
      setCategories(data);
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [loadCategories])
  );

  const onPressHandler = useCallback(
    (category: Category) => {
      navigation.navigate('CategoryDetail', {
        categoryId: category.id,
        categoryName: category.name,
      });
    },
    [navigation]
  );
  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={styles.screen}>
      <View>
        <Text style={styles.header}>Categories</Text>
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            console.log(index);
            return (
              <CategoryItem
                onPress={() => onPressHandler(item)}
                index={index}
                category={item}
              />
            );
          }}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

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
});
