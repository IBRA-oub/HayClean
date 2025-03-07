    import { StyleSheet, Text, TextInput, View } from 'react-native'
    import React, { useState } from 'react'

    const AddInfo = ({ onAddInfoChange }) => {
        const [additionalInfo, setAdditionalInfo] = useState('');

        const handleChange = (text) => {
            setAdditionalInfo(text);
            onAddInfoChange(text);  
        };

        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Additional information</Text>
                <TextInput
                    placeholder="it’s dumps with....."
                    placeholderTextColor={'gray'}
                    style={styles.inputStyle}
                    value={additionalInfo}
                    onChangeText={handleChange}
                />
            </View>
        );
    };


    export default AddInfo

    const styles = StyleSheet.create({
        container: {
            marginTop: 20,
            alignItems:'center'
        },
        textStyle: {
            width: '100%',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '600',
            color: '#12B961'
        },
        inputStyle: {
            width:'95%',
            height:55,
            borderWidth:1,
            borderColor:'gray',
            borderRadius:10,
            marginTop:5,
            padding:5
        }
    })