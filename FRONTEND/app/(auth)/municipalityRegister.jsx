import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import images from '../../constants/images';
import { useRouter } from 'expo-router';
import FormField from '../../components/authComponents/FormField';
import useMunicipalityRegister from '../../hooks/municipalityHooks/useMunicipalityRegister';
import AutocompleteInput from 'react-native-autocomplete-input';
import { clearCities } from '../../redux/features/citySlice';

const municipalityRegister = () => {
    const { form, setForm, getError, hasError, handleSubmit, query, setQuery, cityList, isFocused, setIsFocused, dispatch } = useMunicipalityRegister()
    const router = useRouter()
    return (
        <SafeAreaView style={styles.safeContainer}>
            <KeyboardAvoidingView
                style={styles.flexContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.backLogoContainer}>
                        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
                            <Ionicons name="arrow-back-outline" size={30} color="white" />
                        </TouchableOpacity>
                        <Image
                            source={images.hayClean}
                            style={styles.logoStyle}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.texthi}>Hi!</Text>
                        <Text style={styles.textRegister}>Register yourself with us</Text>
                    </View>

                    <FormField
                        title="Name"
                        value={form.name}
                        handleChangeText={(e) => setForm({ ...form, name: e })}
                        hasError={hasError("name")}
                        placeholder={'Safi Municipality'}
                        otherStyles={{ marginTop: 60 }}
                    />
                    {hasError("name") && <Text style={styles.errorText}>{getError("name")}</Text>}

                    <View style={styles.autocompleteContainer}>
                        <Text style={styles.textField}>City</Text>
                        <AutocompleteInput
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            inputContainerStyle={{
                                borderWidth: 0,
                            }}
                            style={[styles.cityContainer, isFocused && styles.focusedInput]}
                            data={cityList}
                            value={query}
                            placeholderTextColor={'gray'}
                            onChangeText={(text) => { setQuery(text); setForm({ ...form, city: text }); }}
                            placeholder="Safi"
                            flatListProps={{
                                keyboardShouldPersistTaps: 'always',
                                scrollEnabled: false,
                                keyExtractor: (item) => item.geonameId.toString(),
                                renderItem: ({ item }) => (
                                    <TouchableOpacity style={styles.itemContainer} onPress={() => { setQuery(item.name); setForm({ ...form, city: item.name }); dispatch(clearCities()); }}>
                                        <Text style={styles.itemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                ),
                            }}
                        />
                    </View>
                    {hasError("city") && <Text style={styles.errorText}>{getError("city")}</Text>}

                    <FormField
                        title="Phone N°"
                        value={form.phoneNumber}
                        handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
                        hasError={hasError("phoneNumber")}
                        placeholder={'0534567890'}
                        keyboardType='numeric'
                        inputMode={'numeric'}
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("phoneNumber") && <Text style={styles.errorText}>{getError("phoneNumber")}</Text>}

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        hasError={hasError("email")}
                        placeholder={'pnct@interieur.gov.ma'}
                        keyboardType='email-address'
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("email") && <Text style={styles.errorText}>{getError("email")}</Text>}

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        hasError={hasError("password")}
                        placeholder={'**************'}
                        otherStyles={{ marginTop: 20 }}
                    />
                    {hasError("password") && <Text style={styles.errorText}>{getError("password")}</Text>}

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('login')} style={styles.loginText}>
                        <Text style={styles.alreadyAccount}>Already have an account? </Text>
                        <Text style={styles.login}>Login</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default municipalityRegister

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    flexContainer: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    backLogoContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    back: {
        width: 50,
        height: 30,
        backgroundColor: '#12B961',
        overflow: 'hidden',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoStyle: {
        height: 70,
        width: 70
    },
    autocompleteContainer: {
        width: '100%',
        marginTop: 20,
        position: 'relative',
    },
    itemContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    textContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texthi: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    textRegister: {
        color: '#12B961'
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#12B961',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 15,
        marginTop: 20
    },
    signUpText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    },
    loginText: {
        width: '98%',
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',

    },
    alreadyAccount: {
        color: 'gray'
    },
    login: {
        fontWeight: '600'
    },
    errorText: {
        color: "red",
        marginTop: 5,
        fontSize: 14,
        textAlign: 'left',
        width: '100%'
    },
    textField: {
        fontSize: 15,
        marginBottom: 4,
        color: '#232323d6',
    },
    cityContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 10,
        width: '100%',
        height: 56,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: "#dfdfe387",
        borderWidth: 1,
        borderColor: '#a7a7a7b8',
    },
    focusedInput: {
        borderColor: '#12B961',
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: '#12B961',
        alignItems: 'center',

    },
    itemText: {
        padding: 10,
        fontSize: 16
    },
    errorText: {
        color: "red",
        marginTop: 5,
        fontSize: 14,
        textAlign: 'left',
        width: '100%'
    },
})