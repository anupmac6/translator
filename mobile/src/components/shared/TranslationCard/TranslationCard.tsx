import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import Colors from "../../../constants/colors";
import Style from "../../../constants/styles";
import {
  AntDesign,
  Feather,
  Octicons,
  MaterialIcons,
} from "@expo/vector-icons";
import TranslationCardFooterButton from "./TranslationCardFooterButton";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "../../../constants/fonts";
import { Translation } from "../../../services/Translate";
import { Language } from "../../../services/Languages";
import AlternateTranslation from "./AlternateTranslation";
import Definitions from "./Definitions";
import * as Clipboard from "expo-clipboard";
import Favorite from "../Favorite";

interface TranslationCardProps {
  translation: Translation;
  source: Language;
  target: Language;
  query: string;
}
const TranslationCard = ({
  translation,
  source,
  target,
  query,
}: TranslationCardProps) => {
  if (!translation) {
    return null;
  }

  const copyToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(translation?.translation);

    const text = await Clipboard.getStringAsync();
  }, [translation]);

  return (
    <>
      <View style={styles.wrapper}>
        <LinearGradient
          // Background Linear Gradient
          colors={[Colors.primary1, Colors.primary]}
          style={styles.background}
        />
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.contentArea}>
              <View style={styles.translation}>
                <Text style={styles.translationText}>
                  {translation?.translation}
                </Text>
              </View>
              <View style={styles.pronunciation}>
                <Text style={styles.pronunciationText}>
                  {translation?.info?.pronunciation?.translation}
                </Text>
              </View>
            </View>
            <Favorite
              query={query}
              source={source}
              target={target}
              translation={translation}
            />
          </View>
          <View style={styles.footer}>
            <TranslationCardFooterButton type="listen" />

            <TranslationCardFooterButton
              type="copy"
              onPress={copyToClipboard}
            />

            <TranslationCardFooterButton type="save" />

            <TranslationCardFooterButton type="full-screen" />

            <TranslationCardFooterButton type="share" />
          </View>
        </View>
      </View>

      <AlternateTranslation translation={translation} />
      <Definitions translation={translation} />
    </>
  );
};

export default TranslationCard;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    ...Style.dropShadow,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderRadius: 20,
  },
  container: {
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignSelf: "stretch",
    borderRadius: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  contentArea: {
    flex: 1,
    alignSelf: "stretch",
  },
  translation: {},
  pronunciation: {},
  favorite: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 44,
    width: 44,
  },
  translated: {
    padding: 20,
    backgroundColor: Colors.primary1,
    marginTop: 20,
    borderRadius: 20,
    ...Style.dropShadow,
  },
  translatedContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  translationText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 22,
    color: Colors.white,
    marginBottom: 15,
  },
  pronunciationText: {
    fontFamily: Fonts.Karla.Medium,
    fontSize: 20,
    color: Colors.white,
    marginBottom: 10,
  },
});
