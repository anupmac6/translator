import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { Fonts } from '../constants/fonts';
import Colors from '../constants/colors';
import Progress from '../components/shared/Progress';
import QuizCard from '../components/shared/QuizCard';

const { width, height } = Dimensions.get('screen');

const QuizScreen = () => {
  return (
    <SafeAreaView
      edges={['left', 'right', 'top', 'bottom']}
      style={styles.screen}
    >
      <View style={styles.header}>
        <View style={styles.headerClose}>
          <Ionicons name="close" size={24} color={Colors.text} />
        </View>
        <View style={styles.headerProgress}>
          <Text style={styles.headerProgressText}>1 / 10</Text>
        </View>
        <View style={styles.headerSettings}>
          <FontAwesome5 name="question-circle" size={24} color={Colors.text} />
        </View>
      </View>

      <Progress step={2} steps={10} height={4} />

      <View style={styles.resultWrapper}>
        <View style={styles.resultWrong}>
          <Text style={[styles.resultText, styles.resultTextWarning]}>1</Text>
        </View>
        <View style={styles.resultCorrect}>
          <Text style={[styles.resultText, styles.resultTextSuccess]}>1</Text>
        </View>
      </View>

      <View style={styles.cards}>
        <QuizCard
          onSwipeLeft={() => {
            console.log('left');
          }}
          onSwipeRight={() => {
            console.log('right');
          }}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.options}>
          <MaterialCommunityIcons
            name="arrow-u-left-top"
            size={20}
            color={Colors.text}
          />
        </View>
        <View style={[styles.options, styles.optionsMiddle]}>
          <Text style={styles.optionsText}>Options</Text>
        </View>
        <View style={styles.options}>
          <Feather name="volume-2" size={20} color={Colors.text} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerClose: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerProgress: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  headerProgressText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    color: Colors.text,
  },
  headerSettings: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  resultWrapper: {
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultWrong: {
    backgroundColor: Colors.warningBackground,
    borderWidth: 1,
    borderColor: Colors.warningBorder,
    borderLeftWidth: 0,
    paddingVertical: 5,
    paddingRight: 25,
    paddingLeft: 15,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  resultCorrect: {
    backgroundColor: Colors.successBackground,
    borderWidth: 1,
    borderColor: Colors.successBorder,
    borderRightWidth: 0,
    paddingVertical: 5,
    paddingRight: 15,
    paddingLeft: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  resultText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 18,
    lineHeight: 22,
  },
  resultTextSuccess: {
    color: Colors.successText,
  },
  resultTextWarning: {
    color: Colors.warningText,
  },
  footer: {
    marginBottom: 20,
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  options: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 30,
  },
  optionsMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  optionsText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    color: Colors.text,
    alignSelf: 'center',
  },
  cards: {
    // backgroundColor: Colors.white,
    flex: 1,
    marginVertical: height * 0.05,
    marginHorizontal: width * 0.08,
    borderRadius: 20,
  },
});
