import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const AddButton = () => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.box}>
        <AntDesign name="plus" size={24} color={Colors.white} />
      </View>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 60,
    height: 60,
    marginTop: -40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary1,
    borderRadius: 30,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },
  box: {},
});
