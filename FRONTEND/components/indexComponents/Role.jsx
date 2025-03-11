import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '../../constants/images'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Role = () => {
    const router = useRouter()

    const handleSelectRole = async (role) => {
        try {
            await AsyncStorage.setItem('role', role);
            if (role === 'Citizen') {
                router.push('citizenRegister');
            } else if (role === 'Municipality') {
                router.push('municipalityRegister');
            }
        } catch (error) {
            console.error("Error saving role:", error);
        }
    };

    return (
        <ImageBackground source={images.background} style={styles.imageBackground}>
            <View style={styles.citizenRole}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => handleSelectRole('Citizen')}>
                    <Image
                        source={images.citizens}
                        style={styles.imageStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleSelectRole('Citizen')}>
                    <Text style={styles.buttonText}>
                        CITIZEN CLICK HERE
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={styles.municipilatyRole}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => handleSelectRole('Municipality')}>
                    <Image
                        source={images.municipality}
                        style={styles.imageStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleSelectRole('Municipality')}>
                    <Text style={styles.buttonText}>
                        MUNICIPALITY CLICK HERE
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Role

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    citizenRole: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    municipilatyRole: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: '65%',
        height: '60%',
        backgroundColor: '#c2c3c291',
        overflow: 'hidden',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#12B961',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 20,
        marginTop: 20
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    },
    imageStyle: {
        width: '100%',
        height: '70%'
    }
})