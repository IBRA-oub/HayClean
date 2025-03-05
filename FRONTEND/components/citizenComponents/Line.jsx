import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Line = () => {
    return (
        <View style={{ width: '100%', height: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '93%', height: 2, borderBottomWidth: 1, borderColor: '#E3E3E3' }}>
            </View>
        </View>
    )
}

export default Line

const styles = StyleSheet.create({})