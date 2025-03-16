import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '../../constants/images'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import useGetReport from '../../hooks/citizenHooks/useGetReport';

const ReportDumps = () => {
    const router = useRouter()
    const { updateData, loading, setLoading } = useGetReport()
    const firstThreeItems = updateData?.slice(0, 3)

    return (
        <View style={styles.container}>
            <View style={styles.textConatiner}>
                <Text style={styles.textOne}>Report Dumps</Text>
                <Text style={styles.textTwo}>Go , find and Clean this</Text>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
            >
                {firstThreeItems?.length > 0 ? (
                    firstThreeItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => router.push({ pathname: '/reportDetails', params: { id: item?._id } })}>
                            {loading && (
                                <Image
                                    source={images.placeholderImage}
                                    style={styles.imageStyle}
                                />
                            )}
                            <Image
                                source={{ uri: item?.image ? item?.image : images.placeholderImage }}
                                style={[styles.imageStyle, loading ? { position: 'absolute', opacity: 0 } : { opacity: 1 }]}
                                onLoadStart={() => setLoading(true)}
                                onLoadEnd={() => setLoading(false)}
                            />
                            <View style={styles.sadButton}>
                                <Image
                                    source={images.sadIcon}
                                    style={styles.sadIcon}
                                />
                                <Text>{item.sadCount}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Image
                            source={images.noReport}
                            style={styles.noReportImage}
                        />
                        <Text style={styles.emptyText}>No report is available in city.</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.viewAllContain} onPress={() => router.push('allReport')}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.text}>View all</Text>
                        <Feather name="arrow-right" size={17} color="white" />
                    </View>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}

export default ReportDumps

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        width: 420,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        height: 220,
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
    },
    viewAllContain: {
        width: 90,
        height: '100%',
        justifyContent: 'center',

    },
    buttonContainer: {
        width: '90%',
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#12B961',
        padding: 10,
        overflow: 'hidden',
        borderRadius: 20
    },
    text: {
        fontSize: 13,
        fontWeight: '600',
        color: 'white'
    },
    loaderContainer: {
        flex: 1,
        width: '100%',
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noReportImage: {
        width: '20%',
        height: '40%',
    },
})