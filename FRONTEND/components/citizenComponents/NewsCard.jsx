import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useDeleteNews from '../../hooks/municipalityHooks/useDeleteNews';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const NewsCard = ({ item, onEdite }) => {
    const [role, setRole] = useState('')
    const getRole = async () => {
        const resposne = await AsyncStorage.getItem('role')
        setRole(resposne)
    }
    useEffect(() => {
        getRole()
    }, [])

    const { handleDelete } = useDeleteNews();
    
    return (
        <View style={styles.card}>
            <Image
                source={{uri : item?.image}}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {item?.description}
                </Text>
                <View style={styles.dateButtonContainer}>
                    <Text style={styles.date}>{moment(item?.createdAt).format('MMMM YYYY')}</Text>
                    {role === 'municipality' && (
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.icon} onPress={handleDelete}>
                                <FontAwesome name="trash" size={20} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon} onPress={onEdite}>
                                <FontAwesome name="edit" size={20} color="green" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default NewsCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#bebebe21',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 7,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },
    textContainer: {
        flex: 1
    },
    text: {
        fontSize: 14,
        color: '#333'
    },
    date: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    icon: {
        marginLeft: 10
    }, dateButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    }
});
