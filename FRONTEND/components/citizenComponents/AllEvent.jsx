import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventCard from './EventCard'

const AllEvent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Events</Text>
            <EventCard/>
            <EventCard/>
        </View>
    )
}

export default AllEvent

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginTop:10
    },
    title: {
        width: '95%',
        fontSize: 20,
        fontWeight: '600'
    }
})