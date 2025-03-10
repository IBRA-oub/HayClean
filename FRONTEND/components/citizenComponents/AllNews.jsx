import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NewCard from './NewCard'
import images from '../../constants/images'

const AllNews = ({onEdite}) => {
   
    const data = [
        { id: 1, description: 'The municipality of Casablanca will add 100 new garbage trucks next 2026 to improve waste collection and keep the city cleaner. ♻️🚛', image: images.truckIcon },
        { id: 2, description: 'Casablanca will introduce new waste collection points across the city next year to improve waste management and accessibility. ♻️📍', image: images.citizens }
    ]
    return (
        <View style={styles.container}>
            <Text style={styles.title}>News</Text>
            {data.map((item, index) => (
                <NewCard key={index} item={item} onEdite={onEdite} />
            ))}
        </View>
    )
}

export default AllNews

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    title: {
        width: '95%',
        fontSize: 20,
        fontWeight: '600'
    }
})