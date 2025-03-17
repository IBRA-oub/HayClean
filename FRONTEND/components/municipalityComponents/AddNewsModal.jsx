import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import images from '../../constants/images';
import FormField from '../authComponents/FormField';
import useAddNews from '../../hooks/municipalityHooks/useAddNews';


const AddNewsModal = ({ visible, onClose }) => {
    const { form, setForm, getError, hasError, handleSubmit,pickImage } = useAddNews()

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
                        source={images.addNews}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Add News</Text>

                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        {form.image ? (
                            <Image source={{ uri: form.image }} style={styles.previewImage} />
                        ) : (
                            <Text style={styles.placeholderText}>Select an image</Text>
                        )}
                    </TouchableOpacity>
                    {hasError("image") && <Text style={styles.errorText}>{getError("image")}</Text>}

                    <FormField
                        title="Description"
                        value={form.description}
                        handleChangeText={(e) => setForm({ ...form, description: e })}
                        hasError={hasError("description")}
                        placeholder="description about news"
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("description") && <Text style={styles.errorText}>{getError("description")}</Text>}

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => handleSubmit(form.image, form.description, onClose)}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default AddNewsModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        marginTop: 160,
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
    imagePicker: {
        width: "100%",
        height: 150,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    previewImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    placeholderText: {
        color: "#888",
        fontSize: 16,
    },
});
