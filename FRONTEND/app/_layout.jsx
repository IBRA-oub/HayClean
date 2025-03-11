import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ProviderFunction } from '../redux/provider'
import { ToastProvider } from 'react-native-toast-notifications';
const _layout = () => {
    return (
        <ProviderFunction>
            <ToastProvider>
                <Stack>
                    <Stack.Screen name='index' options={{ headerShown: false }} />
                    <Stack.Screen name='(auth)' options={{ headerShown: false }} />
                    <Stack.Screen name='(citizenTabs)' options={{ headerShown: false }} />
                    <Stack.Screen name='(allPages)' options={{ headerShown: false }} />
                    <Stack.Screen name='(municipalityTabs)' options={{ headerShown: false }} />
                </Stack>
            </ToastProvider>
        </ProviderFunction>
    )
}

export default _layout

const styles = StyleSheet.create({})