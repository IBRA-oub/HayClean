import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AcceptedNotCard from '../../components/citizenComponents/AcceptedNotCard';
import CancelPartCard from '../../components/citizenComponents/CancelPartCard';
import useAllEvents from '../../hooks/citizenHooks/useAllEvents';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const notification = () => {
  const { refreshing, onRefresh, participantData } = useAllEvents()
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
        {participantData?.length > 0 ? (
          participantData.map((item, index) =>
            item?.participants?.[0]?.status === "pending" ? (
              <CancelPartCard key={index} item={item} />
            ) : (
              <AcceptedNotCard key={index} item={item} />
            )
          )
        ) : (
          <View style={styles.noNotificationContainer}>
            <MaterialIcons name="notifications-active" size={200} color="#b5b5b561" />
            <Text style={styles.noNotificationText}>No notifications for the moment</Text>
          </View>
        )}

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
  noNotificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  noNotificationText: {
    fontSize: 16,
    color: '#b5b5b5d6',
    fontWeight: 'bold'
  }
})