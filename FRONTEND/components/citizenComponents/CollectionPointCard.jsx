import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const CollectionPointCard = ({item,index,onSelect }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(parseFloat(item.latitude), parseFloat(item.longitude))}>
      <Text style={styles.name}>Collection Point {index}</Text>
      <Text style={styles.distance}>{Math.round(item.distance)}m</Text>
      <AntDesign name="right" size={20} color="gray" />
    </TouchableOpacity>
  );
};

export default CollectionPointCard;

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginVertical: 5,
    alignSelf: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  distance: {
    fontSize: 14,
    color: 'gray',
  },
});
