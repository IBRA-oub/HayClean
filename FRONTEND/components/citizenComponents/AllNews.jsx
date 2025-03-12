import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NewsCard from './NewsCard'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useAllNews from '../../hooks/citizenHooks/useAllNews'

const AllNews = ({ onEdite }) => {
    const { updateData } = useAllNews()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>News</Text>
            {!updateData || updateData.length === 0 ? (
                <View style={styles.noItem}>
                    <FontAwesome name="newspaper-o" size={54} color="gray" />
                    <Text style={styles.noNews}>No news available</Text>
                </View>
            ) : (
                updateData?.map((item, index) => (
                    <NewsCard key={index} item={item} onEdite={onEdite} />
                ))
            )}
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