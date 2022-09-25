import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '../../constants/fonts';
import LottieView from 'lottie-react-native';

const {height} = Dimensions.get('screen')
const OnboardingOne = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(175,225,175,0.6)', 'white']}
        style={styles.background}
      />
      <View style={styles.skip}>
        <Text style={styles.skipText}>Skip</Text>
      </View>
      <View style={styles.image}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'translate',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../../assets/lottie/translate-1.json')}
      />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
            Delivery everywhere
        </Text>
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>
            We are always ready to deliver your items quickly and professionally.
        </Text>
      </View>
      <Text>OnboardingOne</Text>
    </SafeAreaView>
  )
}

export default OnboardingOne

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height/1.2,
      },
      skip:{
        marginTop:10,
        flexDirection: 'row',
        justifyContent:'flex-end'
      },
      skipText:{
        fontFamily: Fonts.Karla.Medium,
        fontSize: 16
      },
      image:{},
      header:{},
      headerText:{},
      subtitle:{},
      subtitleText:{}
})