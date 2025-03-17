import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'expo-router'
const useMunciProfile = () => {
    const router = useRouter()

    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState({
        image: images.user,
        name: 'Municipality Name',
        email: 'email',
        city: 'City, MA',
    });

    const handleDelete = () => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Confirm', onPress: () => console.log('User Deleted') },
        ]);
    };

    const handleLogout = () => {
        Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Confirm', onPress: async () => {
                    try {
                        await AsyncStorage.clear();
                        router.replace('/');
                    } catch (error) {
                        console.error("Error during logout:", error);
                    }
                }
            }, ,
        ]);
    };

    const getProfileInformation = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const decodedData = jwtDecode(token);
                setUserData({
                    name: decodedData.name || '',
                    email: decodedData.email || '',
                    city: decodedData.city || '',
                });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        getProfileInformation();
    }, []);


    const handleEditSubmit = (newData) => {
        setUserData(newData);
        setModalVisible(false);
    };
    return {
        isModalVisible,
        userData,
        setModalVisible,
        handleDelete,
        handleLogout,
        handleEditSubmit

    }
}

export default useMunciProfile

const styles = StyleSheet.create({})