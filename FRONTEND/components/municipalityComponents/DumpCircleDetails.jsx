import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DumpCircleDetails = ({ item }) => {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.circleContainer}>
                <Image source={item.image} style={styles.imageStyle} />
            </View>
            <Text style={styles.textStyle}>{item.title}</Text>
        </View>
    );
};

export default DumpCircleDetails;

const styles = StyleSheet.create({
    sectionContainer: {
        width: '33%',
        height: '90%',
        alignItems: 'center',
        paddingVertical: 10, 
    },
    circleContainer: {
        width: 100,
        height: 100,
        borderRadius: 50, 
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    imageStyle: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    textStyle: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 12,
    },
});
