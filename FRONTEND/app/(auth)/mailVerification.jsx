import React, { useState, useRef } from 'react';
import { 
    Image,
    ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View 
} from 'react-native';
import images from '../../constants/images';

const MailVerification = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const inputs = useRef([]);

    const handleChangeText = (text, index) => {
        if (text.length > 1) {
            text = text.charAt(0); 
        }
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleSubmit = () => {
        const enteredCode = code.join('');
        console.log('Code saisi:', enteredCode);
        // verificatoin
    };

    return (
        <ImageBackground source={images.background} style={styles.background}>
            <KeyboardAvoidingView
                style={styles.flexContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Image
                source={images.hayClean}
                style={styles.logo}
                />
                <View style={styles.container}>
                    <Text style={styles.title}>Enter the code sent to your email</Text>

                    <View style={styles.codeContainer}>
                        {code.map((num, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputs.current[index] = ref)}
                                style={styles.input}
                                keyboardType="numeric"
                                maxLength={1}
                                value={num}
                                placeholder='2'
                                placeholderTextColor={'#bababa75'}
                                onChangeText={(text) => handleChangeText(text, index)}
                            />
                        ))}
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

export default MailVerification;

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    codeContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    input: {
        width: 60,
        height: 80,
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        borderRadius: 20,
        elevation: 5,
    },
    submitButton: {
        marginTop: 50,
        backgroundColor: '#12B961',
        width: 310,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    submitText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logo:{
        width:300,
        height:'30%'
    }
});
