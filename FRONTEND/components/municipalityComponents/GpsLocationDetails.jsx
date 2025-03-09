import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GpsLocationDetails = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>GPS Location</Text>
            <View style={styles.gpsContainer}>
                <View style={styles.gps}>

                </View>

            </View>
        </View>
    )
}

export default GpsLocationDetails;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    textStyle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#12B961'
    },
    gpsContainer: {
        width: '100%',
        height: 200,
        alignItems: 'center',
    },
    gps:{
        width: '95%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
        borderRadius: 10,
        marginTop: 7,
        backgroundColor:'green'
    }
})