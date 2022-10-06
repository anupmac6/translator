import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import React, { useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import LanguageSwitcher from "../../components/shared/LanguageSwitcher";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Image from "../../services/Image";

const { height, width } = Dimensions.get("screen");
const TranslateImageScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = useRef<Camera>(null);

  const insets = useSafeAreaInsets();

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

  const onTakePictureHandler = async () => {
    const photo = await camera?.current?.takePictureAsync({ quality: 0.7 });
    console.log(photo);
    const data = new FormData();
    data.append("files", {
      name: photo?.uri.substring(
        photo?.uri?.lastIndexOf("."),
        photo?.uri?.length
      ),
      uri:
        Platform.OS === "ios" ? photo?.uri.replace("file://", "") : photo?.uri,
    });

    const dat = await Image.upload(data);
    console.log(dat);
  };

  if (!isFocused) {
    return null;
  }

  console.log(width);
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <Camera style={styles.camera} type={type} ref={camera}>
        <View style={styles.pill}>
          <LanguageSwitcher />
        </View>
        <View style={[styles.buttons, { marginBottom: insets.bottom + 30 }]}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="photo-library"
              size={30}
              color={Colors.white}
            />
          </View>

          <Pressable
            onPress={onTakePictureHandler}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: Colors.white,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  borderWidth: 3,
                  borderColor: "black",
                  borderRadius: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
            </View>
          </Pressable>

          <Pressable
            onPress={onTakePictureHandler}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Pressable>
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
    justifyContent: "center",
    alignItems: "center",
  },
});
