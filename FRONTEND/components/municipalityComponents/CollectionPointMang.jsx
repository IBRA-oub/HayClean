import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const CollectionPointMang = () => {
    const router = useRouter()
    return (
        <View>
            <View style={styles.textConatiner}>
                <Text style={styles.textOne}>Nearset collection Points</Text>
            </View>
            <View style={styles.colleRecyleContainer}>
                <TouchableOpacity onPress={() => router.push('/collectionPointsMang')} style={styles.collectionPointe}>
                    <View style={styles.truchContainer}>
                        <AntDesign name="delete" size={60} color="white" />
                    </View>
                    <View style={styles.distanceContainer}>
                        <Text style={styles.distanceText}>
                            collection point management
                        </Text>
                    </View>
                    <View style={styles.buttonStyle}>
                        <AntDesign name="right" size={30} color="gray" />
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={styles.recylPointe}>
                    <View style={styles.recylContainer}>
                        <FontAwesome name="recycle" size={60} color="#12B961" />
                    </View>
                    <View style={styles.distanceContainer}>
                        <Text style={styles.distanceText}>
                            Recyling management
                        </Text>
                    </View>
                    <View style={styles.buttonStyle}>
                        <AntDesign name="right" size={30} color="gray" />
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CollectionPointMang

const styles = StyleSheet.create({
    textConatiner: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
    },
    textOne: {
        fontSize: 18,
        fontWeight: '600',
        color: '#12B961',
    },
    colleRecyleContainer: {
        width: '100%',
        height: 255,
        alignItems: 'center'
    },
    collectionPointe: {
        width: '95%',
        height: '45%',
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    recylPointe: {
        width: '95%',
        height: '45%',
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    truchContainer: {
        width: '20%',
        height: '80%',
        backgroundColor: '#12B961',
        overflow: 'hidden',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    recylContainer: {
        width: '20%',
        height: '80%',
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray'
    },
    distanceContainer: {
        flexDirection: 'row',
        width: '60%',
        height: 30,
        alignItems: 'center'
    },
    distanceText: {
        marginLeft: 15,
        fontSize: 16,
        color: 'gray'
    },
    buttonStyle: {
        width: '10%',
        height: 33,
    }
})