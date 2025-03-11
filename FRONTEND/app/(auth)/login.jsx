import { 
    Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View 
} from 'react-native';
import React, { useState } from 'react';
import images from '../../constants/images';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FormField from '../../components/authComponents/FormField';
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const router = useRouter();
    const {form, setForm,hasError,getError, handleSubmit} = useLogin();

    return (
        <ImageBackground source={images.background} style={styles.background}>
            <KeyboardAvoidingView
                style={styles.flexContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer} 
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.backLogoContainer}>
                        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
                            <Ionicons name="arrow-back-outline" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={images.hayClean} style={styles.logo} />
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.welcomeText}>Welcome Back!</Text>
                            <Text style={styles.exitingText}>We’re so excited to see you again</Text>
                            
                            <FormField
                                title="Email"
                                value={form.email}
                                handleChangeText={(e) => setForm({ ...form, email: e })}
                                hasError={hasError("email")}
                                placeholder="DoeJohn@gmail.com"
                                keyboardType="email-address"
                                otherStyles={{ marginTop: 20 }}
                            />
                            {hasError("email") && <Text style={styles.errorText}>{getError("email")}</Text>}
                            
                            <FormField
                                title="Password"
                                value={form.password}
                                handleChangeText={(e) => setForm({ ...form, password: e })}
                                hasError={hasError("password")}
                                placeholder="**************"
                                secureTextEntry
                                otherStyles={{ marginTop: 20 }}
                            />
                            {hasError("password") && <Text style={styles.errorText}>{getError("password")}</Text>}

                            <TouchableOpacity  style={styles.forgetText}>
                                <Text style={styles.text}>Forgot your password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.signInText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

export default Login;

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    flexContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    logo: {
        width: 300,
        height: '60%',
    },
    backLogoContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 40,
        padding: 10,
    },
    back: {
        width: 50,
        height: 30,
        backgroundColor: '#12B961',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    inputsContainer: {
        width: '95%',
        height:'70%',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 10,
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '600',
        color: '#12B961',
        marginTop: 10,
    },
    exitingText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'gray',
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
    signInText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
    },
    forgetText: {
        width: '98%',
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    text: {
        color: 'gray',
    },
    errorText: {
        color: "red",
        marginTop: 5,
        fontSize: 14,
        textAlign: 'left',
        width: '100%'
    },
});
