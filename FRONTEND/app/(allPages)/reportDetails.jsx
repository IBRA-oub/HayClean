import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import TrashTypeDetails from '../../components/municipalityComponents/TrashTypeDetails';
import GpsLocationDetails from '../../components/municipalityComponents/GpsLocationDetails';
import MoreInfo from '../../components/municipalityComponents/MoreInfo';
import TrashSizeDetails from '../../components/municipalityComponents/TrashSizeDetails';
import useReportDetails from '../../hooks/municipalityHooks/useReportDetails';

const reportDetails = () => {
    const router = useRouter()
    const {reportDetailsData,handleConferm } = useReportDetails()

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <TouchableOpacity onPress={() => router.back()} style={{ width: '16%', paddingLeft: 10 }}>
                    <AntDesign name="left" size={34} color="white" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.textStyle}>Report Details</Text>
                </View>
                <View style={{ width: 65 }}></View>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={styles.imageontainer}>
                    <Image
                        source={{ uri: reportDetailsData?.image }}
                        style={styles.image}
                    />

                </View>

                <TrashSizeDetails size={reportDetailsData?.size} />
                <TrashTypeDetails types={reportDetailsData?.type} />
                <GpsLocationDetails longitude={reportDetailsData?.longitude} latitude={reportDetailsData?.latitude} />
                <MoreInfo accessibility={reportDetailsData?.accessibility} moreInfo={reportDetailsData?.moreInfo} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={()=>handleConferm(reportDetailsData?._id)}>
                        <Text style={styles.confermText}>Conferm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default reportDetails

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
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageontainer: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '95%',
        height: '90%',
        overflow: 'hidden',
        borderRadius: 10
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '95%',
        height: 50,
        backgroundColor: '#12B961',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 20,
    },
    confermText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
    },
})