import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const useDeleteNews = () => {
    const handleDelete = () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete this News?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => console.log("News deleted"), style: "destructive" }
            ]
        );
    };
    return {

        handleDelete
    }

}

export default useDeleteNews

const styles = StyleSheet.create({})