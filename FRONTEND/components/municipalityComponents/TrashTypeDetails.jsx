import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import images from '../../constants/images';
import DumpCircleDetails from './DumpCircleDetails';

const TrashTypeDetails = ({ types }) => {
    const trashData = [
        { id: '1', title: 'HouseHold', image: images.wood },
        { id: '2', title: 'Automotive', image: images.tire },
        { id: '3', title: 'Construction', image: images.construction },
        { id: '4', title: 'Plastic', image: images.plastic },
        { id: '5', title: 'Electronic', image: images.electronic },
        { id: '6', title: 'Organic', image: images.organic },
        { id: '7', title: 'Metal', image: images.metal },
        { id: '8', title: 'Liquid', image: images.liquid },
        { id: '9', title: 'Dangerous', image: images.dangerous },
        { id: '10', title: 'Animal Carcass', image: images.animalCarcass },
        { id: '11', title: 'Glass', image: images.glass },
    ];

    const selectedTypes = trashData?.filter(item => types?.includes(item?.title));
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Type of Trash</Text>
            <View style={styles.TrashTypeContainer}>
                {selectedTypes.length > 0 ? (
                    <FlatList
                        data={selectedTypes}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        renderItem={({ item }) => <DumpCircleDetails item={item} />}
                        contentContainerStyle={styles.listContent}
                        scrollEnabled={false}
                    />
                ) : (
                    <Text>No type specified</Text>
                )}
            </View>
        </View>
    );
};

export default TrashTypeDetails;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    textStyle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#12B961',
        marginBottom: 10,
    },
    TrashTypeContainer: {
        width: '100%',
        alignItems: 'center',
    },
    listContent: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 390,
        borderRadius: 13
    },
});
