import { Pressable, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getAddToCategory, setAddToCategory } from "../store/app/slice";
import Colors from "../constants/colors";
import { Fonts } from "../constants/fonts";
import Checkbox from "expo-checkbox";
import Categories, { Category } from "../services/Categories";
import CategoryItem from "./CategoryItem";

const CategoryBottomSheet = () => {
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState<Category[]>([]);
  const [existsInCategories, setExistsInCategories] = useState<
    { categoryId: string; categoryItemId: string }[]
  >([]);
  const [isExistsInCategoryLoading, setIsExistsInCategoryLoading] =
    useState<boolean>(true);

  const showBottomSheet = useSelector(getAddToCategory);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const loadCategories = async () => {
    if (showBottomSheet) {
      const data = await Categories.get();
      const existsData = await Categories.isInCategory(
        showBottomSheet?.source,
        showBottomSheet?.target,
        showBottomSheet?.query,
        showBottomSheet?.translation
      );
      setCategories(data);
      setExistsInCategories(existsData);
      setIsExistsInCategoryLoading(false);
    }
  };

  // variables
  const snapPoints = useMemo(() => ["75%", "95%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      dispatch(setAddToCategory(null));
      setCategories([]);
      setExistsInCategories([]);
      setIsExistsInCategoryLoading(true);
    }
  }, []);

  useEffect(() => {
    if (showBottomSheet) {
      handlePresentModalPress();
    }
  }, [showBottomSheet]);

  useEffect(() => {
    if (showBottomSheet) {
      loadCategories();
    }
  }, [showBottomSheet]);

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props}>
        <Pressable
          onPress={() => bottomSheetModalRef?.current?.close()}
          style={[
            styles.footerContainer,
            { paddingBottom: insets.bottom, marginBottom: 10 },
          ]}
        >
          <AntDesign name="check" size={20} color={Colors.text} />
          <Text style={styles.footerText}>Done</Text>
        </Pressable>
      </BottomSheetFooter>
    ),
    [insets]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      handleComponent={null}
      footerComponent={renderFooter}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Save to Category</Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Category</Text>
          </View>
        </View>
        <BottomSheetFlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <CategoryItem
              category={item}
              data={showBottomSheet}
              disabled={isExistsInCategoryLoading}
              isInCategory={
                existsInCategories?.findIndex(
                  (category) => category?.categoryId === item?.id
                ) !== -1
              }
            />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </BottomSheetModal>
  );
};

export default CategoryBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.gray1,
    borderBottomWidth: 1,
  },
  headerText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.text,
  },
  button: {
    // backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonText: {
    fontFamily: Fonts.Karla.ExtraBold,
    color: Colors.primary1,
    fontSize: 16,
    lineHeight: 22,
  },
  contentContainer: {
    marginTop: 20,
  },
  footerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderTopColor: Colors.gray1,
    borderTopWidth: 1,
    flexDirection: "row",
  },
  footerText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.text,
    marginLeft: 10,
  },

  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});
