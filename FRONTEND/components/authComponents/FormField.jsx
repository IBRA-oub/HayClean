import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import Fontisto from '@expo/vector-icons/Fontisto';
import icons from '../../constants/icons';

const FormField = ({ title, value, placeholder, handleChangeText,keyboardType,inputMode, otherStyles, hasError }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={[styles.viewContainer, otherStyles]}>
            <Text style={styles.textField}>{title}</Text>
            <View style={[styles.viewContainerInput, isFocused && styles.focusedInput, hasError && styles.inputError]}>
                <TextInput
                    style={styles.textInput}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    keyboardType={keyboardType}
                    inputMode={inputMode}
                    secureTextEntry={title === 'Password' && !showPassword}
                />
                {title === 'Password' &&
                    (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image
                                source={!showPassword ? icons.eye : icons.eyeHide}
                                style={styles.eyeImage}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )
                }
                {
                    placeholder === 'Card Number' &&
                    <Fontisto name="mastercard" size={24} color="black" />
                }
                {
                    placeholder === 'Expiration Date (MM/YY)' &&
                    <Fontisto name="date" size={24} color="black" />
                }
            </View>
        </View>
    )
}

export default FormField

const styles = StyleSheet.create({
    viewContainer: {
        marginTop: 2,
        marginBottom: 2,
    },
    textField: {
        fontSize: 15,
        marginBottom: 4,
        color: '#232323d6',
    },
    viewContainerInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        height: 56,
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
    textInput: {
        display: 'flex',
        flex: 1,
        color: 'black',

    },
    eyeImage: {
        width: 21,
        height: 21
    },
    inputError: {
        borderWidth: 2,
        borderColor: "red",
    },
})