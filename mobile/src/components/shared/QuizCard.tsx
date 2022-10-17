import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Colors from '../../constants/colors';
import FlipCard from './FlipCard';
import SuccessErrorCount from '../QuizScreen/SuccessErrorCount';

interface QuizCardProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SHOW_SWIPE_THRESHOLD = 0.05 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const QuizCard = ({ onSwipeLeft, onSwipeRight }: QuizCardProps) => {
  const position = useRef(new Animated.ValueXY()).current;

  const forceSwipe = (direction: 'left' | 'right') => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'left' | 'right') => {
    // const item = data[this.state.index];

    direction === 'right' ? onSwipeRight() : onSwipeLeft();
    position.setValue({ x: 0, y: 0 });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-45deg', '0deg', '45deg'],
    });

    return {
      transform: [
        { rotate },
        { translateX: position.x },
        { translateY: position.y },
      ],
    };
  };

  const successOpacity = {
    opacity: position.x.interpolate({
      inputRange: [SHOW_SWIPE_THRESHOLD, SWIPE_THRESHOLD],
      outputRange: [0, 1],
    }),
  };
  const errorOpacity = {
    opacity: position.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, -SHOW_SWIPE_THRESHOLD],
      outputRange: [1, 0],
    }),
  };

  return (
    <>
      <SuccessErrorCount
        successStyle={successOpacity}
        errorStyle={errorOpacity}
      />
      <Animated.View
        style={[
          styles.card,
          {
            ...getCardStyle(),
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={[styles.header, styles.headerSuccess, successOpacity]}
        >
          <Text>Got it</Text>
        </Animated.View>
        <Animated.View
          style={[styles.header, styles.headerError, errorOpacity]}
        >
          <Text>Study Again</Text>
        </Animated.View>
        <FlipCard />
      </Animated.View>
    </>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    position: 'relative',
    marginVertical: height * 0.05,
    marginHorizontal: width * 0.08,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSuccess: {
    backgroundColor: Colors.successBorder,
  },
  headerError: {
    backgroundColor: Colors.warningBorder,
  },
});
