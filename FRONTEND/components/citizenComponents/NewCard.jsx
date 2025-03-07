import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import images from '../../constants/images';

const NewCard = ({ item }) => {
    return (
        <View style={styles.card}>
            <Image
                source={item.image}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {item.description}
                </Text>
                <Text style={styles.date}>February 2025</Text>
            </View>
        </View>
    );
};

export default NewCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#bebebe21',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 7,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },
    textContainer: {
        flex: 1
    },
    text: {
        fontSize: 14,
        color: '#333'
    },
    date: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5
    }
});
