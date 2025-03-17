import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const CollectionPointCardMang = ({onEdite,onDelete,item,index }) => {

    const onDeletePress = () => {
        Alert.alert(
          "Confirmation",
          "Voulez-vous vraiment supprimer ce point de collecte ?",
          [
            {
              text: "Annuler",
              style: "cancel",
            },
            {
              text: "Supprimer",
              onPress: onDelete,
              style: "destructive",
            }
          ]
        );
      };
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Collection Point {index}</Text>
        <Text style={styles.info}><Text style={styles.label}>Longitude :</Text> {item?.longitude}</Text>
        <Text style={styles.info}><Text style={styles.label}>Latitude :</Text> {item?.latitude}</Text>
        <Text style={styles.info}><Text style={styles.label}>City :</Text> <Text style={styles.city}>{item?.city}</Text></Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onDeletePress}>
          <FontAwesome name="trash" size={20} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdite}>
          <Entypo name="edit" size={20} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CollectionPointCardMang;

const styles = StyleSheet.create({
  card: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'center',
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  info: {
    fontSize: 14,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  city: {
    color: 'gray',
  },
  icons: {
    flexDirection: 'row',
    gap: 15,
  },
});
