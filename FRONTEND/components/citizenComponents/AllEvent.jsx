import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import EventCard from './EventCard'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useAllEvents from '../../hooks/citizenHooks/useAllEvents';


const AllEvent = () => {
    const { updateData } = useAllEvents()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Events</Text>
            {updateData ? (
                !updateData || updateData.length === 0 ? (
                    <View style={styles.noItem}>
                        <MaterialIcons name="event-note" size={54} color="#b5b5b561" />
                        <Text style={styles.noNews}>No events available</Text>
                    </View>
                ) : (
                    updateData?.map((item, index) => (
                        <EventCard key={index} item={item} />
                    ))
                )) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#12B961" />
                </View>
            )}
        </View>
    )
}

export default AllEvent

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        width: '95%',
        fontSize: 20,
        fontWeight: '600'
    },
    noItem: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noNews: {
        fontSize: 16,
        color: '#b5b5b5d6',
        marginTop: 10
    },
    loaderContainer: {
        flex: 1,
        width: '100%',
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
    }
})