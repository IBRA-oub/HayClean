import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../../constants/images';

const AcceptedNotCard = () => {
    return (
        <View style={styles.card}>
          <Image 
            source={images.ramassage1} 
            style={styles.image} 
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              You have been accepted to the event that will be in Tamaris on 08/02/2025.
              {"\n"}Be ready, see you!
            </Text>
          </View>
        </View>
      );
}

export default AcceptedNotCard

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 5,
      elevation: 3,
      margin: 10
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 10,
      marginRight: 10
    },
    textContainer: {
      flex: 1
    },
    text: {
      fontSize: 14,
      color: '#333'
    }
  });