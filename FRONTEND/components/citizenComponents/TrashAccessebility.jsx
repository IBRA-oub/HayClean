import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Accessibility from './Accessibility'


const TrashAccessebility = ({ onSelectAccessibility }) => {
    const data = [
        { id: 1, title: 'Located in a cave' },
        { id: 2, title: 'Under water/on the waterside' },
        { id: 3, title: 'Not for general cleanup' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Trash Accessibility</Text>
            <View style={styles.TrushAccContainer}>
                <View style={styles.AccContainer}>
                    {data.map((item, index) => (
                        <Accessibility key={index} item={item} onSelectViewMode={onSelectAccessibility} />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default TrashAccessebility

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    textStyle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#12B961'
    },
    TrushAccContainer: {
        width: '100%',
        height: 200,
        alignItems: 'center',
    },
    AccContainer: {
        width: '95%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
        borderRadius: 10,
        marginTop: 7,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
})