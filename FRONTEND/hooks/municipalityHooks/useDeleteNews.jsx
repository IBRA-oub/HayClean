import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { deleteNews } from '../../redux/features/deleteNewsSlice';
import { Toast } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';

const useDeleteNews = () => {
    const dispatch = useDispatch()
    const handleDelete = (itemId) => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete this News?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", onPress: async () => {
                        const response = await dispatch(deleteNews(itemId))
                        if (response.payload.status === 200) {
                            Toast.show('News Deleted Successufuly', { type: 'success', duration: 3000, placement: "top", });
                        } else {
                            Toast.show(`${response.payload.message}`, { type: 'warning', duration: 3000, placement: "top", });
                        }
                    }, style: "destructive"
                }
            ]
        );
    };
    return {

        handleDelete
    }

}

export default useDeleteNews

const styles = StyleSheet.create({})