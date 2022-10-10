import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import { Category } from '../../services/Categories';
import { Fonts } from '../../constants/fonts';
import Colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');
interface CategoryItemProps {
  index: number;
  category: Category;
  onPress: () => void;
}
const CategoryItem = ({ index, category, onPress }: CategoryItemProps) => {
  console.log(index, index % 2);
  const isOnSecondColumn = useMemo(() => index % 2 === 1, [index]);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isOnSecondColumn && styles.secondColumn]}
    >
      <Text style={styles.label}>{category.name}</Text>
      <Text style={styles.itemCount}>{category.itemCount}</Text>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    minHeight: 100,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'relative',
  },
  secondColumn: {
    marginLeft: 15,
  },
  label: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 20,
    lineHeight: 22,
    color: Colors.text,
  },
  itemCount: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontFamily: Fonts.Karla.Bold,
    fontSize: 20,
    color: Colors.text,
  },
});
