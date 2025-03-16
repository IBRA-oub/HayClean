import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import moment from 'moment';
const ReportCard = ({ item }) => {
    const router = useRouter()
    const formattedTime = moment(item.createdAt).fromNow();
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: item?.image }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.time}>{formattedTime}</Text>
                <Text style={styles.reportText}>
                    <Text style={styles.bold}>@{item?.user?.firstName} {item?.user?.lastName} </Text>
                    has reported a new illegal dump in {item?.user?.city}.
                    Take action now to keep the city clean!
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/reportDetails', params: { id: item?._id } })}>
                <AntDesign name="rightcircle" size={34} color="#12B961" />
            </TouchableOpacity>
        </View>
    );
};

export default ReportCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 3,
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    content: {
        flex: 1,
        marginLeft: 10,
    },
    time: {
        color: 'green',
        fontSize: 12,
        marginBottom: 2,
    },
    reportText: {
        fontSize: 14,
        color: '#333',
        width: '95%'
    },
    bold: {
        fontWeight: 'bold',
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
