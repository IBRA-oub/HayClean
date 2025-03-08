import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const _layout = () => {
    const router = useRouter(); 

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#12B961',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: 'white',
                        height: 65,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 0, height: -3 },

                    },
                }}
            >
                <Tabs.Screen
                    name='muniHome'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="home" size={focused ? 30 : 24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='muniInfo'
                    options={{
                        title: 'Info',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <View>
                                <FontAwesome name="newspaper-o" size={focused ? 27 : 24} color={color} />
                            </View>
                        ),
                    }}
                />

                <Tabs.Screen
                    name='muniNotification'
                    options={{
                        title: 'Notification',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <View>
                                <Ionicons name="notifications-outline" size={focused ? 30 : 24} color={color} />
                            </View>
                        ),
                    }}
                />

                <Tabs.Screen
                    name='muniProfile'
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <Feather name="user" size={focused ? 30 : 24} color={color} />
                        ),
                    }}
                />
            </Tabs>

        </>
    );
};

export default _layout;

const styles = StyleSheet.create({});
