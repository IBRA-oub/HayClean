import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter } from 'expo-router';
import FormField from '../../components/authComponents/FormField';
import images from '../../constants/images';
import DateTimePicker from '@react-native-community/datetimepicker';
import useEditeEvent from '../../hooks/municipalityHooks/useEditeEvent';
const editeEvent = () => {
    const router = useRouter();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const { form, setForm, getError, hasError,  pickImage,handleSubmit } = useEditeEvent()
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <TouchableOpacity onPress={() => router.back()} style={{ width: '16%', paddingLeft: 10 }}>
                    <AntDesign name="left" size={34} color="white" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.textStyle}>Update Event</Text>
                </View>
                <View style={{ width: 55 }}></View>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={images.editeEvent}
                            style={styles.image}
                        />
                    </View>
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
                        placeholder="details about event ..."
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("description") && <Text style={styles.errorText}>{getError("description")}</Text>}

                    <FormField
                        title="Location"
                        value={form.location}
                        handleChangeText={(e) => setForm({ ...form, location: e })}
                        hasError={hasError("location")}
                        placeholder="Tamaris"
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("location") && <Text style={styles.errorText}>{getError("location")}</Text>}

                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputContainer}>
                        <Text style={styles.inputText}>{form.date || "Select a date"}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            style={styles.dateStyle}
                            value={form.date ? new Date(form.date) : new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    setForm({ ...form, date: selectedDate.toISOString().split('T')[0] });
                                }
                            }}
                        />
                    )}
                    {hasError("date") && <Text style={styles.errorText}>{getError("date")}</Text>}

                    <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.inputContainer}>
                        <Text style={styles.inputText}>{form.time || "Select a time"}</Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            style={styles.timeStyle}
                            value={form.time ? new Date(`2000-01-01T${form.time}`) : new Date()}
                            mode="time"
                            display="default"
                            onChange={(event, selectedTime) => {
                                setShowTimePicker(false);
                                if (selectedTime) {
                                    const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    setForm({ ...form, time: formattedTime });
                                }
                            }}
                        />
                    )}
                    {hasError("time") && <Text style={styles.errorText}>{getError("time")}</Text>}

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default editeEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navbarContainer: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#12B961',
        paddingTop: 40,
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    cancelSendText: {
        color: 'white',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,

    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#12B961',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 20,
    },
    submitText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
    },
    imageContainer: {
        width: '100%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '20%',
        height: '60%'
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
    inputContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    inputText: {
        fontSize: 16,
        color: '#333',
    },
    dateStyle:{
        left:130,
    },
    timeStyle:{
        left:150,
    }
})