import { Animated, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

interface SuccessErrorCountProps {
  successStyle: any;
  errorStyle: any;
}
const SuccessErrorCount = ({
  successStyle,
  errorStyle,
}: SuccessErrorCountProps) => {
  return (
    <View style={styles.resultWrapper}>
      <View>
        <View style={styles.resultWrong}>
          <Text style={[styles.resultText, styles.resultTextWarning]}>1</Text>
        </View>
        <Animated.View
          style={[styles.resultWrong, styles.resultWrongPlus, errorStyle]}
        >
          <Text style={[styles.resultText, styles.resultTextSuccessPlus]}>
            +1
          </Text>
        </Animated.View>
      </View>
      <View style={{ position: 'relative' }}>
        <View style={styles.resultCorrect}>
          <Text style={[styles.resultText, styles.resultTextSuccess]}>
            &nbsp;1&nbsp;
          </Text>
        </View>
        <Animated.View
          style={[styles.resultCorrect, styles.resultCorrectPlus, successStyle]}
        >
          <Text style={[styles.resultText, styles.resultTextSuccessPlus]}>
            +1
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default SuccessErrorCount;

const styles = StyleSheet.create({
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
    paddingRight: 15,
    paddingLeft: 15,
    width: 50,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  resultCorrect: {
    backgroundColor: Colors.successBackground,
    borderWidth: 1,
    borderColor: Colors.successBorder,
    borderRightWidth: 0,
    paddingVertical: 5,
    width: 50,
    paddingLeft: 20,
    paddingRight: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  resultCorrectPlus: {
    backgroundColor: Colors.successBorder,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  resultWrongPlus: {
    backgroundColor: Colors.warningBorder,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  resultText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 18,
    lineHeight: 22,
  },
  resultTextSuccess: {
    color: Colors.successText,
  },
  resultTextSuccessPlus: {
    color: Colors.white,
  },
  resultTextWarning: {
    color: Colors.warningText,
  },
});
