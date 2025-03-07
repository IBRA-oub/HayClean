import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Line from './Line'
const Accessibility = ({ item, onSelectViewMode }) => {
    const [viewMode, setViewMode] = useState('false');

    const handlePress = (mode) => {
        setViewMode(mode);
        onSelectViewMode(item.title, mode); // Envoi du titre et du mode au parent
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    {item.title}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, viewMode === 'false' && styles.desactiveButton]}
                        onPress={() => handlePress('false')}
                    >
                        <Text style={[styles.buttonText, viewMode === 'false' && styles.desactiveButton]}></Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, viewMode === 'true' && styles.activeButton]}
                        onPress={() => handlePress('true')}
                    >
                        <Text style={[styles.buttonText, viewMode === 'true' && styles.activeText]}></Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Line />
        </>
    );
};


export default Accessibility

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '12%',
        height: '70%',
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    activeButton: {
        backgroundColor: '#12B961',
        overflow: 'hidden',
        borderRadius: 19
    },
    desactiveButton: {
        backgroundColor: 'gray',
        overflow: 'hidden',
        borderRadius: 19
    },
    textStyle: {
        fontSize: 17
    }
})