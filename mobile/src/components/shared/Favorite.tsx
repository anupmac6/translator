import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { Language } from "../../services/Languages";
import { Translation } from "../../services/Translate";
import { useDispatch, useSelector } from "react-redux";
import { addLocalFavorite, getLocalFavorites } from "../../store/data/slice";
import { useIsFocused } from "@react-navigation/native";
import Favorites from "../../services/Favorites";

interface FavoriteProps {
  translation: Translation;
  source: Language;
  target: Language;
  query: string;
}

const Favorite = ({ translation, source, target, query }: FavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const localFavorites = useSelector(getLocalFavorites);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const checkIfFavorite = useCallback(async () => {
    const isFav = await Favorites.isFavorite(
      source,
      target,
      query,
      translation?.translation
    );

    if (isFav) {
      dispatch(
        addLocalFavorite({
          source,
          target,
          query,
          translation: translation?.translation,
        })
      );
    }

    setIsFavorite(isFav);
  }, [isFocused, source, target, query, translation]);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const onPressHandler = useCallback(async () => {
    if (!isFavorite) {
      const data = await Favorites.add(
        source,
        target,
        query,
        translation.translation
      );

      setIsFavorite(true);

      dispatch(
        addLocalFavorite({
          id: data.id,
          source: source,
          query: query,
          target: target,
          translation: translation?.translation,
        })
      );
    }
  }, [isFavorite]);
  return (
    <Pressable onPress={onPressHandler} style={styles.favorite}>
      <AntDesign
        name={isFavorite ? "star" : "staro"}
        size={24}
        color={Colors.white}
      />
    </Pressable>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  favorite: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 44,
    width: 44,
  },
});
