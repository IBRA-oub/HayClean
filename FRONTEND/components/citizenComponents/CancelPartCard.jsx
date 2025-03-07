import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '../../constants/images';

const CancelPartCard = () => {
    return (
        <View style={styles.card}>
            <Image
                source={images.ramassage1}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Join us for a day of action and community spirit!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, numquam!
                </Text>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>Status : <Text style={styles.statusValue}>Pending</Text> </Text>

                    <TouchableOpacity style={styles.cancelButton}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default CancelPartCard

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 3,
        margin: 10
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    text: {
        fontSize: 14,
        color: '#333'
    },
    statusContainer: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between'
    },
    statusLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#28A745'
    },
    statusValue: {
        fontSize: 14,
        color: 'gray'
    },
    cancelButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold'
    }
});