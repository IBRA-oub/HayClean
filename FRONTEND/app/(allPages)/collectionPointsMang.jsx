import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import CollectionPointCardMang from '../../components/municipalityComponents/CollectionPointCardMang';
import AddCollectionPointModal from '../../components/municipalityComponents/AddCollectionPointModal';
import EditeCollectionPointModal from '../../components/municipalityComponents/EditeCollecttionPointModal';
import useEditeCollectionPoint from '../../hooks/municipalityHooks/useEditeCollectionPoint';
import MapView, { Marker } from 'react-native-maps';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const CollectionPointsMang = () => {
    const { router, viewMode, setViewMode, modalVisible, setEditeModalVisible, setModalVisible, editeModalVisible, selectedPoint, handlePress, handleDelete, data, selectedCoords, setSelectedCoords, initialRegion, handleMapPress, copyToClipboard } = useEditeCollectionPoint();

    useEffect(() => {
        if (viewMode === 'list') {
            setSelectedCoords(null);
        }
    }, [viewMode]);



    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <TouchableOpacity onPress={() => router.back()} style={{ width: '16%', paddingLeft: 10 }}>
                    <AntDesign name="left" size={34} color="white" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.textStyle}>Collection Point</Text>
                </View>
                <View style={{ width: 65 }}></View>
            </View>

            <View style={styles.switchContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, viewMode === 'map' && styles.activeButton]}
                        onPress={() => setViewMode('map')}
                    >
                        <Text style={[styles.buttonText, viewMode === 'map' && styles.activeText]}>Map</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, viewMode === 'list' && styles.activeButton]}
                        onPress={() => setViewMode('list')}
                    >
                        <Text style={[styles.buttonText, viewMode === 'list' && styles.activeText]}>List</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {viewMode === 'list' ? (
                <ScrollView style={styles.scrollView}>
                    {data?.length > 0 ? (
                        data?.map((item, index) => (
                            <CollectionPointCardMang key={index} index={index + 1} item={item} onEdite={() => handlePress(item)} onDelete={() => handleDelete(item?._id)} />
                        ))
                    ) : (
                        <View style={styles.noItem}>

                            <FontAwesome6 name="map-location-dot" size={200} color="#b5b5b561" />
                            <Text>No collection-point available</Text>
                        </View>
                    )}
                </ScrollView>
            ) : (
                <MapView style={styles.map} initialRegion={initialRegion} mapType="satellite" onPress={handleMapPress}>
                    {data?.map((item, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(item.latitude),
                                longitude: parseFloat(item.longitude),
                            }}
                            title={`Collection Point ${index + 1}`}
                            description={item.city}
                        />
                    ))}

                    {selectedCoords && (
                        <Marker
                            coordinate={selectedCoords}
                            title="Nouvelle Position"
                            description="Cliquez pour copier"
                            onPress={() => copyToClipboard('latitude')}
                            pinColor="orange"
                        />
                    )}
                </MapView>
            )}

            {selectedCoords && (
                <View style={styles.coordContainer}>
                    <TouchableOpacity onPress={() => copyToClipboard('longitude')}>
                        <Text style={styles.coordText}>
                            Lon: <Text style={styles.copyText}>{selectedCoords.longitude} <Text style={styles.copierText}>(copy)</Text></Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => copyToClipboard('latitude')}>
                        <Text style={styles.coordText}>
                            Lat: <Text style={styles.copyText}>{selectedCoords.latitude} <Text style={styles.copierText}>(copy)</Text></Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            )}


            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <AntDesign name="plus" size={30} color="white" />
            </TouchableOpacity>

            <AddCollectionPointModal visible={modalVisible} onClose={() => setModalVisible(false)} />

            {editeModalVisible && (
                <EditeCollectionPointModal pointData={selectedPoint} visible={editeModalVisible} onClose={() => setEditeModalVisible(false)} />
            )}
        </View>
    );
};

export default CollectionPointsMang;

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
    switchContainer: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '50%',
        height: '70%',
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    activeButton: {
        backgroundColor: '#12B961',
        overflow: 'hidden',
        borderRadius: 19
    },
    buttonText: {
        fontSize: 17,
        color: 'black',
    },
    activeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    map: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#12B961',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    coordContainer: {
        position: 'absolute',
        top: 155,
        left: 80,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        height: 75,
        justifyContent: 'space-around'
    },
    coordText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray'
    },
    copyText: {
        color: 'orange',
        fontSize: 14,
    },
    copierText: {
        fontSize: 12,
        color: '#12B961',
        fontWeight: '400'
    }
});
