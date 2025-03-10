import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import FormField from '../../components/authComponents/FormField';
import useAddEvent from '../../hooks/municipalityHooks/useAddEvent';
import images from '../../constants/images';

const addEvent = () => {
    const router = useRouter();
    const { form, setForm, getError, hasError, handleSubmit } = useAddEvent()
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <TouchableOpacity onPress={() => router.back()} style={{ width: '16%', paddingLeft: 10 }}>
                    <AntDesign name="left" size={34} color="white" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.textStyle}>Add New Event</Text>
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
                            source={images.NewEvent}
                            style={styles.image}
                        />
                    </View>
                    <FormField
                        title="Image"
                        value={form.image}
                        handleChangeText={(e) => setForm({ ...form, image: e })}
                        hasError={hasError("image")}
                        placeholder="Image"
                        otherStyles={{ marginTop: 20 }}
                    />
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

                    <FormField
                        title="Date"
                        value={form.date}
                        handleChangeText={(e) => setForm({ ...form, date: e })}
                        hasError={hasError("date")}
                        placeholder="2025-07-01"
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("date") && <Text style={styles.errorText}>{getError("date")}</Text>}

                    <FormField
                        title="Time"
                        value={form.time}
                        handleChangeText={(e) => setForm({ ...form, time: e })}
                        hasError={hasError("time")}
                        placeholder="09:00"
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("time") && <Text style={styles.errorText}>{getError("time")}</Text>}

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default addEvent

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
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        width: '20%',
        height:'60%'
    },
    errorText: {
        color: "red",
        marginTop: 5,
        fontSize: 14,
        textAlign: 'left',
        width: '100%'
    },
})