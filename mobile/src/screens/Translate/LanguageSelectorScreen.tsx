import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import HeaderButton from "../../components/shared/HeaderButton";
import Loading from "../../components/shared/Loading";
import Languages, { Language } from "../../services/Languages";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanguages,
  getRecentLanguages,
  setRecentLanguages,
} from "../../store/data/slice";
import { combineRecentAndAllLanguages } from "../../utils/languageUtility";
import ListHeader from "../../components/shared/ListHeader";
import LanguageItem from "../../components/LanguageItem";
import Colors from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Divider from "../../components/shared/Divider";
import {
  getSourceLanguage,
  getTargetLanguage,
  setSourceLanguage,
  setTargetLanguage,
} from "../../store/app/slice";
import SegmentedControl from "../../components/shared/SegmentedControl";
import SearchBar from "../../components/shared/SearchBar";

interface LanguageSelectorScreenProps {}

const LanguageSelectorScreen = () => {
  const route = useRoute();
  // Params Data
  const languageType = route.params?.languageType;

  // State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLanguageType, setSelectedLanguageType] = useState<number>(
    languageType === "source" ? 0 : 1
  );
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);
  // Navigation
  const navigation = useNavigation();

  // Dispatch
  const dispatch = useDispatch();
  // Is Focused
  const isFocused = useIsFocused();

  // Redux Data
  const recentLanguages = useSelector(getRecentLanguages);
  const languages = useSelector(getLanguages);
  const sourceLanguage = useSelector(getSourceLanguage);
  const targetLanguage = useSelector(getTargetLanguage);

  // Layout Effect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton title="Done" onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  // Get Recent Languages
  const loadRecentLanguages = useCallback(async () => {
    const response = await Languages.getRecent();
    dispatch(setRecentLanguages(response));
    if (isFocused) {
      setIsLoading(false);
    }
  }, [Languages, isFocused]);
  // ComponentDidMount
  useEffect(() => {
    loadRecentLanguages();
    if (!languageType) {
      navigation.goBack();
    }
  }, []);

  const combinedData = useMemo(
    () => combineRecentAndAllLanguages(recentLanguages, languages, search),
    [languages, recentLanguages, search]
  );

  const onLanguageItemPressHandler = useCallback(
    async (language: Language) => {
      if (selectedLanguageType === 0) {
        // Source
        await Languages.setSourceLanguage(language);
        dispatch(setSourceLanguage(language?.code));
      } else {
        // Target
        await Languages.setTargetLanguage(language);
        dispatch(setTargetLanguage(language?.code));
      }
    },
    [selectedLanguageType]
  );
  return (
    <SafeAreaView style={styles.screen} edges={["left", "right"]}>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <View style={styles.searchBar}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <SearchBar value={search} onChange={setSearch} />
            </KeyboardAvoidingView>
            {sourceLanguage && targetLanguage && (
              <View style={styles.listHeader}>
                <SegmentedControl
                  values={[sourceLanguage?.name, targetLanguage?.name]}
                  selectedIndex={selectedLanguageType}
                  onChange={setSelectedLanguageType}
                />
              </View>
            )}
          </View>
          <SectionList
            sections={combinedData}
            keyExtractor={(item, index) => item.code + index}
            renderItem={({ item, index, section }) => (
              <LanguageItem
                title={item?.name}
                isFirst={index === 0}
                isLast={index === section.data.length - 1}
                onPress={() => onLanguageItemPressHandler(item)}
                selected={
                  sourceLanguage?.code === item.code ||
                  targetLanguage?.code === item.code
                }
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <ListHeader title={title} />
            )}
            contentContainerStyle={{
              marginHorizontal: 20,
            }}
            stickySectionHeadersEnabled={false}
            ListFooterComponent={() => <View style={styles.footer}></View>}
            ItemSeparatorComponent={Divider}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default LanguageSelectorScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  footer: { margin: 50, minHeight: 1 },
  listHeader: {},
  searchBar: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
  },
});
