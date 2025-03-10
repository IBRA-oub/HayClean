import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import images from '../../constants/images';

const EditeProfile = ({ visible, onClose, onSubmit, userData }) => {
    const [image, setImage] = useState(userData.image);
    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [email, setEmail] = useState(userData.email);
    const [city, setCity] = useState(userData.city);

    return (
        <Modal visible={visible} transparent animationType="slide">
             <View style={styles.modalOverlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>

                        <Image source={images.user} style={styles.imagePreview} />
                        <TextInput style={styles.input} placeholder="Image URL" value={image} onChangeText={setImage} />
                        <TextInput style={styles.input} placeholder="first Name" value={firstName} onChangeText={setFirstName} />
                        <TextInput style={styles.input} placeholder="last Name" value={lastName} onChangeText={setLastName} />
                        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                        <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={() => onSubmit({ image, firstName,lastName, email, city })}
                            >
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default EditeProfile;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        marginTop: 150,
        width: '90%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imagePreview: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#c2c2c2bf',
    },
    submitButton: {
        backgroundColor: '#12B961',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
