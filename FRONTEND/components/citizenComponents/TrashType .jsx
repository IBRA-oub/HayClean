import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DumpCircle from './DumpCircle';
import images from '../../constants/images';

const TrashType = ({ onSelectType }) => {
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelect = (id, title) => {
        setSelectedIds((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((item) => item !== id);
            } else {
                return [...prevSelected, id];
            }
        });

        onSelectType(title);
    };

    const trashData = [
        [
            { id: '1', title: 'HouseHold', image: images.wood },
            { id: '2', title: 'Automotive', image: images.tire },
            { id: '3', title: 'Construction', image: images.construction },
        ],
        [
            { id: '4', title: 'Plastic', image: images.plastic },
            { id: '5', title: 'Electronic', image: images.electronic },
            { id: '6', title: 'Organic', image: images.organic },
        ],
        [
            { id: '7', title: 'Metal', image: images.metal },
            { id: '8', title: 'Liquid', image: images.liquid },
            { id: '9', title: 'Dangerous', image: images.dangerous },
        ],
        [
            { id: '10', title: 'Animal Carcass', image: images.animalCarcass },
            { id: '11', title: 'Glass', image: images.glass },
        ]
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Type of Trash</Text>
            <View style={styles.TrushTypeContainer}>
                <View style={styles.TypeContainer}>
                    {trashData.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.rowContainer}>
                            {row.map((item) => (
                                <DumpCircle
                                    key={item.id}
                                    item={item}
                                    isSelected={selectedIds.includes(item.id)}
                                    onPress={() => toggleSelect(item.id, item.title)}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default TrashType;

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
    TrushTypeContainer: {
        width: '100%',
        height: 600,
        alignItems: 'center',
    },
    TypeContainer: {
        width: '95%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
        borderRadius: 10,
        marginTop: 7
    },
    rowContainer: {
        width: '100%',
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
});
