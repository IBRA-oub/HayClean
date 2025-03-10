import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import images from '../../constants/images';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import useDeleteEvent from '../../hooks/municipalityHooks/useDeleteEvent';

const EventCard = () => {
  const router = useRouter()
  const { handleDelete } = useDeleteEvent();
  const role = 'municipality'
  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <Text style={styles.title}>Municipality Casa-Blanca</Text>
        <View style={styles.location}>
          <Ionicons name="location-outline" size={16} color="black" />
          <Text style={styles.locationText}>Arrahma</Text>
        </View>
      </View>

      <Image source={images.ramassage1} style={styles.image} />

      <Text style={styles.description}>
        Join us for a day of action and community spirit!
      </Text>

      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}>
          <Text style={styles.bold}><Fontisto name="date" size={15} color="gray" /> </Text> 09/02/2024
        </Text>
        <Text style={styles.time}>
          <Text style={styles.bold}><AntDesign name="clockcircleo" size={15} color="gray" /> </Text> 10:00 AM
        </Text>
      </View>

      {role === 'municipality' ? (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.deleteIcon}  onPress={handleDelete}>
            <FontAwesome name="trash" size={20} color="white" />
            <Text style={styles.deleteText}> Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editeIcon} onPress={() => router.push('editeEvent')}>
            <FontAwesome name="edit" size={20} color="white" />
            <Text style={styles.editeText}>Edite</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.joinButton}>
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
