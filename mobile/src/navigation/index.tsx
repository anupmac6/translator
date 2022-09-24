import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './stack/AuthStack'

const Navigation = () => {
  return (
    <NavigationContainer>
        <AuthStack />
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})