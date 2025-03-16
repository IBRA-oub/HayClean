import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import ReportCard from '../../components/municipalityComponents/ReportCard';
import useGetReport from '../../hooks/citizenHooks/useGetReport';

const allReport = () => {
    const router = useRouter()
    const { updateData } = useGetReport()
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <TouchableOpacity onPress={() => router.back()} style={{ width: '16%', paddingLeft: 10 }}>
                    <AntDesign name="left" size={34} color="white" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.textStyle}>All Report</Text>
                </View>
                <View style={{ width: 65 }}></View>
            </View>
            {updateData?.map((item, index) => (
                <ReportCard key={index} item={item} />
            ))}
        </View>
    )
}

export default allReport

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
})