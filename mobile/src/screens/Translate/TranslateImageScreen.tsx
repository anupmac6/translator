import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import LanguageSwitcher from "../../components/shared/LanguageSwitcher";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");
const TranslateImageScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const isFocused = useIsFocused();

  if (!permission) {
    requestPermission();
  }

  if (!permission?.granted) {
    // denied permission
    requestPermission();
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!isFocused) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.pill}>
          <LanguageSwitcher />
        </View>
        <View style={styles.buttons}>
          <View>
            <MaterialIcons
              name="photo-library"
              size={30}
              color={Colors.white}
            />
          </View>
          <View>
            <MaterialIcons
              name="photo-library"
              size={30}
              color={Colors.white}
            />
          </View>
          <View>
            <MaterialIcons
              name="photo-library"
              size={30}
              color={Colors.white}
            />
          </View>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

export default TranslateImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  pill: {
    flex: 1,
    flexDirection: "row",
    marginTop: 70,
  },
  buttons: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
