import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { UserProvider } from './mediator'

const _layout = () => {
  return (
    <UserProvider>
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </UserProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})