import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const DumpCircle = ({ item, isSelected, onPress }) => {
    return (
        <View style={styles.SectionContainer}>
            <View style={styles.circleContainer}>
                <TouchableOpacity style={[styles.sizeImageContainer , isSelected && styles.selected]} onPress={onPress}>
                    <Image
                        source={item.image}
                        style={styles.imageStyle}
                    />
                </TouchableOpacity>
                <Text style={styles.textStyle}>{item.title}</Text>
            </View>
        </View>
    );
};

export default DumpCircle;

const styles = StyleSheet.create({
    SectionContainer: {
        width: '30%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#12b96154',
    },
    sizeImageContainer: {
        width: '90%',
        height: '80%',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: '80%',
        height: '80%',
    },
    textStyle: {
        width: 130,
        textAlign: 'center',
    },
});
