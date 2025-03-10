import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import NotificationCard from '../../components/municipalityComponents/NotificationCard';
import ReportCard from '../../components/municipalityComponents/ReportCard';

const muniNotification = () => {
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
        <NotificationCard/>
        <NotificationCard/>
        <ReportCard/>
        <ReportCard/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default muniNotification

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