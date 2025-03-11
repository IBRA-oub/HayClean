import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../constants/images'
import useGetReport from '../../hooks/citizenHooks/useGetReport'


const NearestDumps = () => {
    const { updateData, handleTogglSad } = useGetReport()
    return (
        <View style={styles.container}>
            <View style={styles.textConatiner}>
                <Text style={styles.textOne}>Nearest Dumps</Text>
                <Text style={styles.textTwo}>Go , find and update these dumps</Text>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
            >
                {updateData ? (
                    updateData.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.imageStyle}
                            />
                            <TouchableOpacity style={styles.sadButton} onPress={() => handleTogglSad(item._id)}>
                                <Image
                                    source={images.sadIcon}
                                    style={styles.sadIcon}
                                />
                                <Text>{item.sadCount}</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Image
                            source={images.noReport}
                            style={styles.noReportImage}

                        />
                        <Text style={styles.emptyText}>No report is available in this city.</Text>
                    </View>
                )}


            </ScrollView>

        </View>
    )
}

export default NearestDumps

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        width: 420,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    },
    noReportImage: {
        width: '20%',
        height: '40%',
    },
    container: {
        width: '100%',
        height: 240,
    },
    textConatiner: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textOne: {
        fontSize: 18,
        fontWeight: '600',
        color: '#12B961',
    },
    textTwo: {
        color: 'gray',
    },
    scrollContainer: {

    },
    itemContainer: {
        width: 220,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: -2 },
        shadowOpacity: 0.5,
        shadowRadius: 7

    },
    imageStyle: {
        width: '80%',
        height: '70%',
        borderRadius: 10,
    },
    sadButton: {
        width: '50%',
        height: 44,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 10,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    sadIcon: {
        width: 25,
        height: 25,
        marginRight: 9
    }
})