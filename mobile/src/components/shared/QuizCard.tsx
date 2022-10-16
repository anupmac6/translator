import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import Colors from '../../constants/colors';

interface QuizCardProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
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
      //     onPanResponderMove: (event, gesture) => {
      //     position.setValue({ x: gesture.dx, y: gesture.dy });
      //   },
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
      outputRange: ['-90deg', '0deg', '90deg'],
    });

    return {
      transform: [
        { rotate },
        { translateX: position.x },
        { translateY: position.y },
      ],
    };
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          ...getCardStyle(),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text>QuizCard</Text>
    </Animated.View>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    flex: 1,
    borderRadius: 20,
  },
});
