import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import useCollectionPoint from '../../hooks/citizenHooks/useCollectionPoint';

const GpsLocation = ({ onLocationUpdate }) => {
    const { userLocation } = useCollectionPoint();

    useEffect(() => {
        if (userLocation) {
            onLocationUpdate(userLocation);
        }
    }, [userLocation]);

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>GPS Location</Text>
            <View style={styles.mapContainer}>
                {userLocation ? (
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                            latitudeDelta: 0.0005,
                            longitudeDelta: 0.005,
                        }}
                        mapType="satellite"
                        zoomEnabled={true} 
                        rotateEnabled={false} 
                    >
                        <Marker
                            coordinate={{
                                latitude: userLocation.latitude,
                                longitude: userLocation.longitude,
                            }}
                            title="Votre position"
                            pinColor="green"
                        />
                    </MapView>
                ) : (
                    <Text style={styles.loadingText}>Obtention de la localisation...</Text>
                )}
            </View>
        </View>
    );
};

export default GpsLocation;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    textStyle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#12B961',
    },
    mapContainer: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '95%',
        height: '100%',
        borderRadius: 10,
    },
    loadingText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});
