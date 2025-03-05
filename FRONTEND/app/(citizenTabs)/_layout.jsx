import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TabsLayouts = () => {
    const router = useRouter(); // Pour naviguer vers la page Scan

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
                    name='home'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="home" size={focused ? 30 : 24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='info'
                    options={{
                        title: 'Info',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <View style={{ marginRight: 50, width: 40 }}>
                                <FontAwesome name="newspaper-o" size={focused ? 27 : 24} color={color} />
                            </View>
                        ),
                    }}
                />

                <Tabs.Screen
                    name='notification'
                    options={{
                        title: 'Notification',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <View style={{ marginLeft: 50, width: 40 }}>
                                <Ionicons name="notifications-outline" size={focused ? 30 : 24} color={color} />
                            </View>
                        ),
                    }}
                />

                <Tabs.Screen
                    name='profile'
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <Feather name="user" size={focused ? 30 : 24} color={color} />
                        ),
                    }}
                />
            </Tabs>

            {/* picture button*/}
            <View style={styles.scanContainer}>
                <TouchableOpacity
                    style={styles.scanButton}
                    // onPress={() => router.push('/citizen/scan')}
                >
                    <View style={styles.scanCircle}>
                        <MaterialCommunityIcons name="cube-scan" size={40} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default TabsLayouts;

const styles = StyleSheet.create({
    scanContainer: {
        position: 'absolute',
        bottom: 20,
        left: '49%',
        transform: [{ translateX: -32 }],
        zIndex: 10,
    },
    scanButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanCircle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#12B961',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 5 },
    },
});
