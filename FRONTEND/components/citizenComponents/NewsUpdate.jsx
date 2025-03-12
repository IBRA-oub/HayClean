import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Line from './Line'
import EventCard from './EventCard'
import useRecentEvents from '../../hooks/citizenHooks/useRecentEvents'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const NewsUpdate = () => {
    const { updateData } = useRecentEvents()
    return (
        <View>
            <View style={styles.textConatiner}>
                <Text style={styles.textOne}>Nearset collection Points</Text>
            </View>

            {!updateData || updateData.length === 0 ? (
                <View style={styles.noItem}>
                    <MaterialIcons name="event-note" size={54} color="gray" />
                    <Text style={styles.noNews}>No events available</Text>
                </View>
            ) : (
                updateData?.map((item, index) => (
                    <View  key={index}>
                        <Line />
                        <EventCard item={item} />
                    </View>
                ))
            )}

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
    noItem: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noNews: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10
    }
})