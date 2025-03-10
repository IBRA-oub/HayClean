import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import images from '../../constants/images';

const NotificationCard = () => {
    return (
        <View style={styles.card}>
            <Image
                source={images.user}
                style={styles.avatar}
            />
            <View style={styles.content}>
                <Text style={styles.message}>
                    <Text style={styles.username}>@brahim</Text> Want to participate in the Tamaris event on 03/02/2025 at 10:00 PM?
                </Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={[styles.button, styles.reject]}>
                        <Text style={[styles.buttonText, styles.rejectButton]}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.accept]}>
                        <Text style={[styles.buttonText]}>Accepte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default NotificationCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 3,
        margin: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 20,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    message: {
        fontSize: 14,
        color: '#333',
    },
    username: {
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'flex-end'
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
    },
    accept: {
        backgroundColor: '#12B961',
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reject: {
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red'
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    rejectButton: {
        color: 'red',
    }
});
