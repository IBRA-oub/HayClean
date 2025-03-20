import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const AcceptedNotCard = ({ item }) => {
  console.log(item?.participants?.[0].status)
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item?.image }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {item?.participants?.[0].status === "accepted" ?

            `You have been accepted to the event that will be in ${item?.city}  ${item?.location} on ${item?.date ? new Date(item.date).toISOString().split('T')[0] : 'Invalid Date'}.
              ${"\n"}Be ready, see you!`
            :
            `You have been rejected from the event that was planned in ${item?.city} ${item?.location} on ${item?.date ? new Date(item.date).toISOString().split('T')[0] : 'Invalid Date'}.  
             ${"\n"}Unfortunately, you won't be able to participate this time.`

          }
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