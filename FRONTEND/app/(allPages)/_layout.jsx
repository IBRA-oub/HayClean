import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {
  return (
    <>
      <StatusBar style="dark-content" />
      <Stack>
        <Stack.Screen name="collectionPoints" options={{ headerShown: false }} />
        <Stack.Screen name="reportDump" options={{ headerShown: false }} />
        <Stack.Screen name="collectionPointsMang" options={{ headerShown: false }} />
        <Stack.Screen name="allReport" options={{ headerShown: false }} />
        <Stack.Screen name="reportDetails" options={{ headerShown: false }} />
        <Stack.Screen name="addEvent" options={{ headerShown: false }} />
        <Stack.Screen name="editeEvent" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}

export default _layout

const styles = StyleSheet.create({})
