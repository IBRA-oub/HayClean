import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PhotoUploader from '../../components/citizenComponents/PhotoUploader';
import TrashSize from '../../components/citizenComponents/TrashSize';
import TrashType from '../../components/citizenComponents/TrashType ';
import TrashAccessebility from '../../components/citizenComponents/TrashAccessebility';
import { useRouter } from 'expo-router';
import GpsLocation from '../../components/citizenComponents/GpsLocation';
import AddInfo from '../../components/citizenComponents/AddInfo';
import useReport from '../../hooks/citizenHooks/useReport';

const reportDump = () => {
    const router = useRouter();
    const { setSelectedSize, handleSelectType, handleSelectAccessibility, handleAddInfoChange,handlePhotoSelected,handleLocationUpdate, handleSend } = useReport()
    return (

        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <TouchableOpacity onPress={() => router.back()} style={{ width: '16%', paddingLeft: 10 }}>
                    <Text style={styles.cancelSendText}>Cancel</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.textStyle}>Report Dump</Text>
                </View>
                <TouchableOpacity onPress={handleSend} style={{ width: 55 }}>
                    <Text style={styles.cancelSendText}>Send</Text>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 50 }}>
                    <PhotoUploader onPhotoSelected={handlePhotoSelected} />
                    <TrashSize onSelectSize={setSelectedSize} />
                    <TrashType onSelectType={handleSelectType} />
                    <TrashAccessebility onSelectAccessibility={handleSelectAccessibility} />
                    <GpsLocation onLocationUpdate={handleLocationUpdate} />
                    <AddInfo onAddInfoChange={handleAddInfoChange} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default reportDump

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navbarContainer: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#12B961',
        paddingTop: 40,
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    cancelSendText: {
        color: 'white',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
})