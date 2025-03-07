import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AcceptedNotCard from '../../components/citizenComponents/AcceptedNotCard';
import CancelPartCard from '../../components/citizenComponents/CancelPartCard';

const notification = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#12B961"
          />
        }
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <AcceptedNotCard/>
        <AcceptedNotCard/>
        <CancelPartCard/>
        <AcceptedNotCard/>
        <CancelPartCard/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default notification

const styles = StyleSheet.create({
  container: {
    height: 865,
    backgroundColor: '#12B961'
  },
  scrollContainer: {
    backgroundColor: 'white',
    height: '100%'
  },
})