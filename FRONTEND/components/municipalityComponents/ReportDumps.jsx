import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '../../constants/images'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const ReportDumps = () => {
    const router = useRouter()
    const data = [
        { id: 1, image: images.mohmadiaDumps, likes: '5k' },
        { id: 2, image: images.rabatDumps, likes: '5k' },
        { id: 3, image: images.background, likes: '5k' }
    ]

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
                {data.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.itemContainer}>
                        <Image
                            source={item.image}
                            style={styles.imageStyle}
                        />
                        <View style={styles.sadButton}>
                            <Image
                                source={images.sadIcon}
                                style={styles.sadIcon}
                            />
                            <Text>
                                {item.likes}
                            </Text>

                        </View>

                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.viewAllContain} onPress={()=> router.push('allReport')}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.text}>View all</Text>
                    <Feather name="arrow-right" size={20} color="#12B961" />
                    </View>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}

export default ReportDumps

const styles = StyleSheet.create({
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
    viewAllContain:{
        width:90,
        height:'100%',
        justifyContent:'center',
    },
    buttonContainer:{
        width:'80%',
        height:'40%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:13,
        fontWeight:'600',
        color:'#12B961'
    }
})