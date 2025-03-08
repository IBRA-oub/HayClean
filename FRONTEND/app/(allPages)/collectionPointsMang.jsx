import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import CollectionPointCardMang from '../../components/municipalityComponents/CollectionPointCardMang';
import AddCollectionPointModal from '../../components/municipalityComponents/AddCollectionPointModal';
import EditeCollectionPointModal from '../../components/municipalityComponents/EditeCollecttionPointModal';

const collectionPointsMang = () => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState('list');
    const [modalVisible, setModalVisible] = useState(false);
    const [editeModalVisible, setEditeModalVisible] = useState(false);

    const handlePress = () => {
        setEditeModalVisible(true)
    }

    const handleDelete = () => {
        console.log("Point de collecte supprimé !");
      };

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
                    <CollectionPointCardMang onEdite={handlePress} onDelete={handleDelete} />
                    <CollectionPointCardMang onEdite={handlePress} onDelete={handleDelete} />
                    <CollectionPointCardMang onEdite={handlePress} onDelete={handleDelete} />
                    <CollectionPointCardMang onEdite={handlePress} onDelete={handleDelete} />
                </ScrollView>
            ) : (
                <View style={styles.mapPlaceholder}></View>
            )}
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <AntDesign name="plus" size={30} color="white" />
            </TouchableOpacity>

            <AddCollectionPointModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            <EditeCollectionPointModal
                visible={editeModalVisible}
                onClose={() => setEditeModalVisible(false)}
            />
        </View>
    );
}

export default collectionPointsMang

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
    mapPlaceholder: {
        flex: 1,
        backgroundColor: '#12B961',
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
});