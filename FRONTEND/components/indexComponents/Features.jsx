import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import images from '../../constants/images'

const Features = ({ onSkip }) => {
    const data = [
        { id: 1, title: 'Take a picture', description: 'Capture and upload a photo of the waste to help identify the issue and take action', image: images.takePhoto },
        { id: 2, title: 'Add to map', description: 'Mark the exact location on the map to ensure a quicker and more efficient cleanup', image: images.map },
        { id: 3, title: 'Report this Trabech', description: 'Submit a detailed report to notify the cleanup team and improve your neighborhood', image: images.reportDumps },
    ]

    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);
        } else {
            onSkip();
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.logonSkipContainer}>
                    <Image
                        source={images.hayClean}
                        style={styles.logoStyle}
                    />

                    <TouchableOpacity style={styles.skipConstainer} onPress={onSkip}>
                        <Text>Skip</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <Image
                        source={data[index].image}
                        style={styles.image}
                    />
                    <Text style={styles.title}>{data[index].title}</Text>
                    <Text style={styles.description}>{data[index].description}</Text>

                    <View style={styles.pointsContainer}>
                        {data.map((_, i) => (
                            <View key={i} style={[styles.point, index === i && styles.activePoint]} />
                        ))}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.nextText}>{index === data.length - 1 ? "Get Started" : "Next"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Features

const styles = StyleSheet.create({
    container: {
        height: '100%',

    },
    viewContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logonSkipContainer: {
        width: '95%',
        height: '55',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoStyle: {
        height: 90,
        width: 90
    },
    skipConstainer: {
        width: 60,
        height: 40,
        justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    contentContainer: {
        width: '95%',
        height: '70%',
        alignItems: 'center',
        marginTop: 60
    },
    image: {
        width: '100%',
        height: '55%'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 5
    },
    description: {
        width: '80%',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 30,
        color: 'gray'
    },
    pointsContainer: {
        width: 100,
        height: 30,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    point: {
        width: 20,
        height: 10,
        backgroundColor: '#cdcdcd',
        overflow: 'hidden',
        borderRadius: 10

    },
    activePoint: {
        width: 40,
        // backgroundColor: '#12B961', 
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#12B961',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 20,
        marginTop: 20
    },
    nextText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    }


})