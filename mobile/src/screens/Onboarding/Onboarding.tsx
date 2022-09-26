import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '../../constants/fonts';
import LottieView, { AnimationObject } from 'lottie-react-native';
import lottie1 from '../../../assets/lottie/translate-1.json';
import lottie2 from '../../../assets/lottie/translate-2.json';
import lottie3 from '../../../assets/lottie/translate-3.json';
import lottie4 from '../../../assets/lottie/translate-4.json';
import lottie5 from '../../../assets/lottie/translate-5.json';
import { useDispatch } from 'react-redux';
import { setShowOnboarding } from '../../store/app/slice';
import Animated, { FadeIn, FadeOut, Layout, RollInRight, SlideInLeft, SlideInRight } from 'react-native-reanimated';

const { height, width } = Dimensions.get('screen');
interface onboardingItem {
  id: number;
  lottie: object;
  header: string;
  subHeader: string;
}

const Onboarding = () => {
  const items: onboardingItem[] = [
    {
      id: 0,
      lottie: lottie1,
      header: 'World Map with people',
      subHeader:
        'We are always ready to deliver your items quickly and professionally.',
    },
    {
      id: 1,
      lottie: lottie2,
      header: 'Translate any languages',
      subHeader:
        'We are always ready to deliver your items quickly and professionally.',
    },
    {
      id: 2,
      lottie: lottie3,
      header: 'Translate using  voice',
      subHeader:
        'We are always ready to deliver your items quickly and professionally.',
    },
    {
      id: 3,
      lottie: lottie4,
      header: 'Translate using Camera',
      subHeader:
        'We are always ready to deliver your items quickly and professionally.',
    },
    {
      id: 4,
      lottie: lottie5,
      header: 'Listen to your translation',
      subHeader:
        'We are always ready to deliver your items quickly and professionally.',
    },
  ];

  const dispatch = useDispatch();

  const [currentItem, setCurrentItem] = useState<number>(0);

  const onSkipOrFinish = useCallback(() => {
    dispatch(setShowOnboarding(false));
  }, [dispatch]);

  const onNextHandler = useCallback(() => {
    if (currentItem !== items.length - 1) {
      setCurrentItem((prevState) => prevState + 1);
    } else {
      onSkipOrFinish();
    }
  }, [currentItem, onSkipOrFinish]);

  const onBackHandler = useCallback(() => {
    if (currentItem !== 0) {
      setCurrentItem((prevState) => prevState - 1);
    }
  }, [currentItem]);

  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(175,225,175,0.6)', 'white']}
        style={styles.background}
      />
      <Pressable style={styles.skip} onPress={onSkipOrFinish}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
      <View
        style={{
          flex: 2,
          justifyContent: 'space-around',
        }}
      >
        <View style={styles.image}>
          <LottieView
            autoPlay
            loop
            style={{
              width: width - 40,
              height: width - 40,
              backgroundColor: 'transparent',
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={items[currentItem].lottie as AnimationObject}
          />
        </View>
        <View style={{}}>
          <Animated.View
            entering={SlideInRight}
            layout={Layout.delay(100)}
            style={styles.header}
          >
            <Text style={styles.headerText}>{items[currentItem].header}</Text>
          </Animated.View>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>
              {items[currentItem].subHeader}
            </Text>
          </View>
        </View>
      </View>
      <View style={{}}>
        <View style={styles.actions}>
          <Pressable
            onPress={onBackHandler}
            style={styles.screenIndicatorWrapper}
          >
            {items.map((item, index) => index === currentItem ?(
              <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              layout={Layout}
                key={item.id}
                style={styles.screenIndicatorActive}
              ></Animated.View>
            ) : (
              <View
                key={item.id}
                style={ styles.screenIndicator
                }
              ></View>
            ))}
          </Pressable>
          <Pressable onPress={onNextHandler} style={styles.button}>
            <Text style={styles.buttonText}>
              {currentItem === items.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height / 1.6,
  },
  skip: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  skipText: {
    fontFamily: Fonts.Karla.Medium,
    fontSize: 16,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 24,
    lineHeight: 30,
    width: '50%',
  },
  subtitle: {},
  subtitleText: {
    fontFamily: Fonts.Karla.Regular,
    fontSize: 16,
    lineHeight: 22,
    width: '80%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  screenIndicatorWrapper: {
    flexDirection: 'row',
  },
  screenIndicator: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginRight: 4,
  },
  screenIndicatorActive: {
    height: 10,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    marginRight: 4,
  },
  button: {
    backgroundColor: 'rgb(175,225,175)',
    paddingHorizontal: 25,
    paddingVertical: 6,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: Fonts.Karla.Medium,
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
  },
});
