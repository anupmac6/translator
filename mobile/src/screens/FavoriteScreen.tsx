import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/shared/SearchBar";
import { Fonts } from "../constants/fonts";
import Colors from "../constants/colors";
import {
  useIsFocused,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import Favorites from "../services/Favorites";
import { SearchItem } from "../services/History";

const FavoriteScreen = () => {
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState<SearchItem[]>([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const loadFavorites = useCallback(async () => {
    const data = await Favorites.get();
    if (isFocused) {
      setFavorites(data);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );
  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.screen}>
      <View>
        <Text style={styles.header}>Favorites</Text>
      </View>
      <View style={styles.search}>
        <SearchBar value={search} onChange={setSearch} />
      </View>

      <FlatList
        data={favorites}
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item.search}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;

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
});
