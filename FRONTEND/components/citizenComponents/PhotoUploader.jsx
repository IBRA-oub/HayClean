import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

const PhotoUploader = ({ onPhotoSelected }) => {
    const [photoUri, setPhotoUri] = useState(null);

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert("Permission refusée !");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
            onPhotoSelected(result.assets[0].uri);
        }
    };
    return (

        <View style={styles.photoContainer}>
            {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
                <Text style={styles.photoText}>Take at least one photo</Text>
            )}
            <TouchableOpacity style={styles.addPhotoButton} onPress={takePhoto}>
                <AntDesign name="camera" size={24} color="white" />{ }
                <Text style={styles.addPhotoText}>{photoUri ? 'UP-DATE' : 'ADD PHOTO'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PhotoUploader

const styles = StyleSheet.create({
    photoContainer: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c5c5c591'
    },
    photoText: {
        fontSize: 17,
        fontWeight: '600',
        color: 'black'
    },
    addPhotoButton: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#12B961',
        padding: 10,
        borderRadius: 5,
        marginTop: 5
    },
    addPhotoText: {
        color: 'white',
        marginLeft: 5
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    }
})