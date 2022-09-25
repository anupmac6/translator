import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './stack/AuthStack'
import { useSelector } from 'react-redux'
import { getShowOnboarding } from '../store/app/slice'
import OnboardingStack from './stack/OnboardingStack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Navigation = () => {
  const showOnboarding = useSelector(getShowOnboarding)
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {showOnboarding && <OnboardingStack />}
        {!showOnboarding && <AuthStack /> }
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default Navigation

const styles = StyleSheet.create({})