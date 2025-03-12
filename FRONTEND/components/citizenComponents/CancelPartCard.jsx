import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useAllEvents from '../../hooks/citizenHooks/useAllEvents';


const CancelPartCard = ({ item }) => {
    const { handelCancelParticipation } = useAllEvents()

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: item?.image }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {item?.description}
                </Text>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>Status : <Text style={styles.statusValue}>{item?.participants[0]?.status}</Text> </Text>
                    {item?.participants[0]?.status === "pending" &&
                        <TouchableOpacity style={styles.cancelButton} onPress={() => handelCancelParticipation(item?._id)} >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    }
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