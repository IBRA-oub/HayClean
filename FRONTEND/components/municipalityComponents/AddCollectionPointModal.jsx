import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import images from '../../constants/images';
import FormField from '../authComponents/FormField';
import useAddCollectionPoint from '../../hooks/municipalityHooks/useAddCollectionPoint';

const AddCollectionPointModal = ({ visible, onClose}) => {
    const { form,setForm,getError,hasError,handleSubmit} = useAddCollectionPoint()

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContainer}
                >
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <AntDesign name="close" size={24} color="green" />
                    </TouchableOpacity>
                    <Image
                        source={images.addMap}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Add Collection Point</Text>

                    <FormField
                        title="longitude"
                        value={form.longitude}
                        handleChangeText={(e) => setForm({ ...form, longitude: e })}
                        hasError={hasError("longitude")}
                        placeholder="64.4567890"
                        keyboardType="numbers-and-punctuation"
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("longitude") && <Text style={styles.errorText}>{getError("longitude")}</Text>}

                    <FormField
                        title="latitude"
                        value={form.latitude}
                        handleChangeText={(e) => setForm({ ...form, latitude: e })}
                        hasError={hasError("latitude")}
                        placeholder="64.4567890"
                        keyboardType="numbers-and-punctuation"
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("latitude") && <Text style={styles.errorText}>{getError("latitude")}</Text>}

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => handleSubmit(form.longitude, form.latitude,onClose)}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default AddCollectionPointModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        marginTop:160,
        width: '90%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    submitButton: {
        width: '100%',
        backgroundColor: '#12B961',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: 40,
        height: 40
    },
    errorText: {
        color: "red",
        marginTop: 5,
        fontSize: 14,
        textAlign: 'left',
        width: '100%'
    },
});
