import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const MoreInfo = ({ accessibility, moreInfo }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>More Information</Text>
            <View style={styles.moreInfoContainer}>
                <View style={styles.infoContainer}>
                    {/* j'ai une error ici dans la methode de l'insertion des accessibility a db essayer de corriger add report */}
                    {accessibility?.map((item, index) => (
                        <View key={index} style={styles.accessInfo}>
                            <Text style={styles.textTwoStyle}>{item}</Text>
                            <Entypo name="check" size={24} color="#12B961" />
                        </View>
                    ))}
                    {moreInfo && (
                        <View style={styles.moreInfo}>
                            <Text>{moreInfo}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

export default MoreInfo

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    textStyle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#12B961',
    },
    moreInfoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    infoContainer: {
        width: '95%',
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 7,
    },
    accessInfo: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    textTwoStyle: {
        fontSize: 16
    },
    moreInfo: {
        width: '95%',
        paddingVertical: 10
    }
})