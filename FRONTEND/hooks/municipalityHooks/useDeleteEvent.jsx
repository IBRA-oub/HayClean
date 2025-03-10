import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const useDeleteEvent = () => {
   const handleDelete = () => {
         Alert.alert(
             "Confirmation",
             "Are you sure you want to delete this Event?",
             [
                 { text: "Cancel", style: "cancel" },
                 { text: "Delete", onPress: () => console.log("Event deleted"), style: "destructive" }
             ]
         );
     };
     return {
 
         handleDelete
     }
}

export default useDeleteEvent

const styles = StyleSheet.create({})