import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const MoreInfo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>More Information</Text>
            <View style={styles.moreInfoContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.accessInfo}>
                        <Text style={styles.textTwoStyle}>Located in a cave</Text>
                        <Entypo name="check" size={24} color="#12B961" />
                    </View>
                    <View style={styles.accessInfo}>
                        <Text style={styles.textTwoStyle}>Located in a cave</Text>
                        <Entypo name="check" size={24} color="#12B961" />
                    </View>
                    <View style={styles.moreInfo}>
                        <Text>Located in a cave Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta est
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos temporibus saepe, ullam debitis nostrum iste. Suscipit quod ducimus amet officiis.
                         temporibus debitis ducimus nulla, fugit officia officiis porro vel assumenda.</Text>
                    </View>
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
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10
    },
    textTwoStyle:{
        fontSize:16
    },
    moreInfo:{
        width:'95%',
        paddingVertical:10
    }
})