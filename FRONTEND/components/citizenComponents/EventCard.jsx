import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useDeleteEvent from '../../hooks/municipalityHooks/useDeleteEvent';
import useAllEvents from '../../hooks/citizenHooks/useAllEvents';


const EventCard = ({ item }) => {
  const { handleDelete } = useDeleteEvent();
  const { role, hadleParticipation, } = useAllEvents()

  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <Text style={styles.title}>Municipality {item?.city}</Text>
        <View style={styles.location}>
          <Ionicons name="location-outline" size={16} color="black" />
          <Text style={styles.locationText}>{item?.location}</Text>
        </View>
      </View>

      <Image source={{ uri: item?.image }} style={styles.image} />

      <Text style={styles.description}>
        {item?.description}
      </Text>

      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}>
          <Text style={styles.bold}><Fontisto name="date" size={15} color="gray" /> </Text>
          {item?.date ? new Date(item.date).toISOString().split('T')[0] : 'Invalid Date'}
        </Text>
        <Text style={styles.time}>
          <Text style={styles.bold}><AntDesign name="clockcircleo" size={15} color="gray" /> </Text> {item?.time}
        </Text>
      </View>

      {role === 'Municipality' ? (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
            <FontAwesome name="trash" size={20} color="white" />
            <Text style={styles.deleteText}> Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editeIcon} onPress={() => router.push('editeEvent')}>
            <FontAwesome name="edit" size={20} color="white" />
            <Text style={styles.editeText}>Edite</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.joinButton} onPress={() => hadleParticipation(item?._id)}>
          <Text style={styles.joinButtonText}>Participate</Text>
        </TouchableOpacity>
      )}

    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  date: {
    fontSize: 14,
    color: '#333',
  },
  time: {
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: '#12B961',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  deleteIcon: {
    marginHorizontal: 10,
    width: '45%',
    height: 30,
    overflow: 'hidden',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  editeIcon: {
    marginHorizontal: 10,
    width: '45%',
    height: 30,
    overflow: 'hidden',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  editeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});
