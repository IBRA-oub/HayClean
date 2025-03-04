import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ProviderFunction } from '../redux/provider'
const _layout = () => {
    return (
        <ProviderFunction>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='(auth)' options={{ headerShown: false }} />
            </Stack>
        </ProviderFunction>
    )
}

export default _layout

const styles = StyleSheet.create({})