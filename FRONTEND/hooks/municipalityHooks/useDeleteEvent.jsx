import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { deleteEvent } from "../../redux/features/deleteEventSlice";
import { useDispatch } from 'react-redux';
import { Toast } from 'react-native-toast-notifications';

const useDeleteEvent = () => {
    const dispatch = useDispatch()
    const handleDelete = (itemId) => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete this Event?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", onPress:async() => {
                        const response = await dispatch(deleteEvent(itemId))
                        if (response.payload.status === 200) {
                            Toast.show('Event Deleted Successufuly', { type: 'success', duration: 3000, placement: "top", });
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

export default useDeleteEvent

const styles = StyleSheet.create({})