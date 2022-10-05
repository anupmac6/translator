import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Categories, { Category } from "../services/Categories";
import Colors from "../constants/colors";
import Checkbox, { CheckboxEvent } from "expo-checkbox";
import { Fonts } from "../constants/fonts";
import { Language } from "../services/Languages";

interface CategoryItemProps {
  category: Category;
  data: {
    source: Language;
    target: Language;
    query: string;
    translation: string;
  } | null;
  isInCategory?: boolean;
  disabled?: boolean;
}

const CategoryItem = ({
  category,
  data,
  isInCategory,
  disabled,
}: CategoryItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(isInCategory || false);

  const onPressHandler = () => {
    if (disabled) {
      return;
    }
    if (isChecked) {
      // remove
      Categories.removeItem();
    } else {
      // add
      Categories.addToCategory(
        category.id,
        data?.source,
        data?.target,
        data?.query,
        data?.translation
      );
    }
    setIsChecked((prevState) => !prevState);
  };

  useEffect(() => {
    if (isInCategory !== undefined && isChecked !== isInCategory) {
      setIsChecked(isInCategory);
    }
  }, [isInCategory]);
  return (
    <Pressable onPress={onPressHandler} style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        color={Colors.primary1}
        disabled={disabled}
      />
      <Text style={styles.checkboxLabel}>{category.name}</Text>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  checkbox: {},
  checkboxLabel: {
    marginLeft: 25,
    fontFamily: Fonts.Karla.Bold,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.primary1,
  },
});
