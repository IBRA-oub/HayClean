import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const PhotoUploader = () => {
    return (
        <View style={styles.photoContainer}>
            <Text style={styles.photoText}>Take at least one photo</Text>
            <TouchableOpacity style={styles.addPhotoButton}>
                <AntDesign name="camera" size={24} color="white" />
                <Text style={styles.addPhotoText}>ADD PHOTO</Text>
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
})