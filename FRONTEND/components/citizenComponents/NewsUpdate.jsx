import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Line from './Line'
import EventCard from './EventCard'

const NewsUpdate = () => {
    return (
        <View>
            <View style={styles.textConatiner}>
                <Text style={styles.textOne}>Nearset collection Points</Text>
            </View>
            <Line />
            <EventCard />

            <Line />
            <EventCard />
        </View>
    )
}

export default NewsUpdate

const styles = StyleSheet.create({
    textConatiner: {
        marginTop: 10,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textOne: {
        fontSize: 18,
        fontWeight: '600',
        color: '#12B961',
    },
})