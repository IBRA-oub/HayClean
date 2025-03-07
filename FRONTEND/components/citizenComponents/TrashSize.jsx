import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DumpCircle from './DumpCircle';
import images from '../../constants/images';

const TrashSize = ({ onSelectSize }) => {
    const [selectedId, setSelectedId] = useState(null);

    const data = [
        { id: 1, title: 'Fits in bag', image: images.bag },
        { id: 2, title: 'Fits in a wheelbarrow', image: images.wheelbarrow },
        { id: 3, title: 'Truck needed', image: images.truckIcon },
    ];

    const handleSelect = (id) => {
        const newSelectedId = selectedId === id ? null : id;
        setSelectedId(newSelectedId);
        onSelectSize(newSelectedId ? data.find(item => item.id === newSelectedId).title : null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Size of Trash</Text>
            <View style={styles.TrushsizeContainer}>
                <View style={styles.sizeContainer}>
                    {data.map((item) => (
                        <DumpCircle 
                            key={item.id} 
                            item={item} 
                            isSelected={selectedId === item.id} 
                            onPress={() => handleSelect(item.id)}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default TrashSize;

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
    TrushsizeContainer: {
        width: '100%',
        height: 150,
        alignItems: 'center',
    },
    sizeContainer: {
        width: '95%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 7,
    },
});
