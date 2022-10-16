import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import Colors from '../../constants/colors';

const FlipCard = () => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = useRef(0).current;
  flipAnimation.addListener(({ value }) => (flipRotation = value));
  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };
  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    // <Pressable
    //   style={styles.cardWrapper}
    //   onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}
    // >
    <>
      <Animated.View style={{ ...styles.cardFront, ...flipToBackStyle }}>
        <Pressable
          onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}
          style={{ backgroundColor: 'red', paddingHorizontal: 50 }}
        >
          <Text>Front</Text>
        </Pressable>
      </Animated.View>
      <Animated.View style={{ ...styles.cardBack, ...flipToFrontStyle }}>
        <Pressable
          onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}
          style={{ backgroundColor: 'red', paddingHorizontal: 50 }}
        >
          <Text>Back</Text>
        </Pressable>
      </Animated.View>
    </>
    // </Pressable>
  );
};

export default FlipCard;

const styles = StyleSheet.create({
  cardWrapper: { flex: 1 },
  cardFront: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    backgroundColor: Colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    backfaceVisibility: 'hidden',
    backgroundColor: Colors.white,
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
