import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import LanguageSwitcher from '../../components/shared/LanguageSwitcher';

const { height, width } = Dimensions.get('screen');
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

  console.log(permission);
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!isFocused) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.pill}>
          <LanguageSwitcher />
        </View>
      </Camera>
    </View>
  );
};

export default TranslateImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    marginBottom: -20,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
