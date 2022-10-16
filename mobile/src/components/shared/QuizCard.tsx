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

  const [header, setHeader] = useState<'error' | 'success' | null>(null);

  const forceSwipe = (direction: 'left' | 'right') => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => onSwipeComplete(direction));

    setHeader(null);
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
    setHeader(null);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        if (gesture.dx > SHOW_SWIPE_THRESHOLD) {
          setHeader('success');
        } else if (gesture.dx < -SHOW_SWIPE_THRESHOLD) {
          setHeader('error');
        } else {
          setHeader(null);
        }
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
      {header && header === 'success' && (
        <View style={[styles.header, styles.headerSuccess]}>
          <Text>Got it</Text>
        </View>
      )}
      {header && header === 'error' && (
        <View style={[styles.header, styles.headerError]}>
          <Text>Study Again</Text>
        </View>
      )}
      <FlipCard />
    </Animated.View>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    width: '100%',
  },
  header: {
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
