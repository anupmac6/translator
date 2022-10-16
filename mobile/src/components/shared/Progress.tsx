import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

interface ProgressProps {
  step: number;
  steps: number;
  height: number;
}
const Progress = ({ step, steps, height }: ProgressProps) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);
  return (
    <View
      onLayout={(e) => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      style={{
        height,
        backgroundColor: 'rgba(2, 64, 89,0.1)',
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          height,
          width: '100%',
          borderTopRightRadius: height,
          borderBottomRightRadius: height,
          backgroundColor: 'rgba(2, 64, 89,0.5)',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        }}
      ></Animated.View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({});
