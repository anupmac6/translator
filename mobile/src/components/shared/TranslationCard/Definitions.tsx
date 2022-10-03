import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Translation } from "../../../services/Translate";
import Colors from "../../../constants/colors";
import Style from "../../../constants/styles";
import { Fonts } from "../../../constants/fonts";

interface DefinitionsProps {
  translation: Translation;
}

const Definitions = ({ translation }: DefinitionsProps) => {
  if (translation?.info?.definitions?.length === 0) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Definition</Text>

      {translation?.info?.definitions?.map((definition, index) => (
        <View style={styles.group} key={index}>
          <Text style={styles.groupHeader}>{definition?.type}</Text>
          <View style={styles.item}>
            {definition?.list?.map((listItem, index) => (
              <View key={index} style={{ marginVertical: 10 }}>
                <Text style={styles.itemLabel}>{listItem?.definition}</Text>
                {listItem?.example && (
                  <Text style={styles.itemExample}>"{listItem?.example}"</Text>
                )}

                {!!listItem?.synonyms?.length && (
                  <View>
                    <Text key={index} style={styles.itemValue}>
                      <Text style={{ color: Colors.text }}>Synonyms: </Text>
                      {listItem?.synonyms?.join(", ")}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Definitions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    // marginBottom: 30,
    ...Style.dropShadow,
  },
  header: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    color: Colors.primary1,
    marginBottom: 10,
  },
  group: {},
  groupHeader: {
    fontFamily: Fonts.Karla.Medium,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
    color: Colors.gray5,
  },
  item: {
    paddingLeft: 15,
  },
  itemLabel: {
    fontFamily: Fonts.Karla.Regular,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.text,
  },
  itemValue: {
    marginVertical: 8,
    fontFamily: Fonts.Karla.Light,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.gray5,
  },
  itemExample: {
    fontFamily: Fonts.Karla.RegularItalic,
    fontSize: 16,
    lineHeight: 22,
    marginVertical: 4,
    color: Colors.gray5,
  },
});
