import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';

const GpsLocationDetails = ({ longitude, latitude }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>GPS Location</Text>
            <View style={styles.gpsContainer}>
                {longitude && latitude ? (
                    <MapView
                        style={styles.gps}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0005,
                            longitudeDelta: 0.005,
                        }}
                        mapType="satellite"
                        zoomEnabled={true}
                        rotateEnabled={false}
                    >
                        <Marker
                            coordinate={{
                                latitude: latitude,
                                longitude: longitude,
                            }}
                            title="dumps position"
                            pinColor="green"
                        />
                    </MapView>
                ) : (
                    <Text style={styles.loadingText}>Obtention de la localisation...</Text>
                )}

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
    gps: {
        width: '95%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
        borderRadius: 10,
        marginTop: 7,
        backgroundColor: 'green'
    }
})