import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '../../constants/images'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Line from '../../components/citizenComponents/Line';
import Entypo from '@expo/vector-icons/Entypo';
import useCitizenProfile from '../../hooks/citizenHooks/useCitizenProfile';
import EditeProfile from '../../components/citizenComponents/EditeProfile';


const profile = () => {
  const { isModalVisible, userData, setModalVisible, handleDelete, handleLogout, handleEditSubmit } = useCitizenProfile();
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <ImageBackground
          source={images.background}
          style={{ width: '100%', height: '100%' }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={images.user}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        </ImageBackground>
        <View style={styles.infoContainer}>
          <Text style={styles.userNameText}>{userData.firstName} {userData.lastName}</Text>
          <View style={styles.persoConstiner}>
            <View style={styles.emailConatiner}>
              <AntDesign name="idcard" size={20} color="black" />
              <Text style={{ textAlign: 'center' }}> {userData.email}</Text>
            </View>
            <View style={styles.cityConatiner}>
              <MaterialCommunityIcons name="home-city" size={20} color="black" />
              <Text style={{ textAlign: 'center' }} >{userData.city} , MA </Text>
            </View>

          </View>
        </View>
        <Line />
        <View style={styles.buttonConatiner}>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <MaterialIcons name="delete-sweep" size={24} color="red" />
            <Text style={{ color: 'red' }}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <AntDesign name="edit" size={24} color="green" />
            <Text style={{ color: 'green' }}>Edite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Entypo name="log-out" size={24} color="gray" />
            <Text style={{ color: 'gray' }}>LogOut</Text>

          </TouchableOpacity>

        </View>

        <View style={styles.thanksContainer}>
          <View style={styles.contentContainer}>
            <Text style={{ textAlign: 'center', width: '80%', fontSize: 16 }}>
              By downloading this application, you acknowledge your responsibility in keeping your environment clean and understand the dangers of waste. ♻️🚮{'\n'}
              {'\n'}Improper waste disposal harms nature, wildlife, and public health. Together, we can make a difference! 🌍💚{'\n'}
              {'\n'}Invite your friends to join and help build a larger community for a cleaner future! 🤝✨
            </Text>
          </View>

        </View>

      </View>

      <EditeProfile visible={isModalVisible} onClose={() => setModalVisible(false)} onSubmit={handleEditSubmit} userData={userData} />

    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerStyle: {
    width: '100%',
    height: 250,
    backgroundColor: 'black'
  },
  imageContainer: {
    width: 180,
    height: 180,
    backgroundColor: 'black',
    position: 'absolute',
    top: 160,
    right: 110,
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white'
  },
  infoContainer: {
    width: '100%',
    height: 120,
    marginTop: 100,
  },
  userNameText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700'
  },
  persoConstiner: {
    width: '100%',
    height: 70,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  emailConatiner: {
    width: '55%',
    height: 40,
    backgroundColor: '#12b96138',
    overflow: 'hidden',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityConatiner: {
    width: '40%',
    height: 40,
    backgroundColor: '#12b96138',
    overflow: 'hidden',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonConatiner: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10
  },
  button: {
    width: '30%',
    height: '90%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  thanksContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
})