import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import LottieView, { AnimationObject } from 'lottie-react-native';
import loading from '../../../assets/lottie/loading.json';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'transparent',
        }}
        source={loading}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
