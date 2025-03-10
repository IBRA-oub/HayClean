import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Line from '../../components/citizenComponents/Line';
import images from '../../constants/images';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import AllNews from '../../components/citizenComponents/AllNews';
import AllEvent from '../../components/citizenComponents/AllEvent';
import AddNewsModal from '../../components/municipalityComponents/AddNewsModal';
import EditeNewsModal from '../../components/municipalityComponents/EditeNewsModal';

const muniInfo = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [editeModalVisible, setEditeModalVisible] = useState(false);

  const handlePress = () => {
    setEditeModalVisible(true)
}


  const router = useRouter()
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

        <View style={styles.heroConatiner}>
          <Image
            source={images.background}
            style={styles.imageStyle}
          />
          <View style={styles.whiteBackground}></View>
          <View style={styles.textContainer}>
            <Text style={styles.titleSyle}>Environmental & Community Updates</Text>
            <Line />
            <Text style={styles.subTitleSyle}>Create and update all News and Evnets</Text>
          </View>
        </View>
        <AllNews  onEdite={handlePress} />
        <Line />
        <AllEvent />
      </ScrollView>


      <TouchableOpacity style={styles.addButton} onPress={() => setVisible(!visible)}>
        {visible ?
          <Feather name="x" size={30} color="white" />
          :
          <AntDesign name="plus" size={30} color="white" />
        }
      </TouchableOpacity>
      {visible &&
        <View style={styles.buttonsConatiner}>
          <TouchableOpacity style={styles.addButtonContainer} onPress={() => setModalVisible(true)}>
            <Text style={styles.addText}> Add News </Text>
            <Feather name="arrow-right" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButtonContainerEvent} onPress={() => router.push('addEvent')}>
            <Text style={styles.addText}> Add Events </Text>
            <Feather name="arrow-right" size={22} color="white" />
          </TouchableOpacity>
        </View>}

      <AddNewsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <EditeNewsModal
        visible={editeModalVisible}
        onClose={() => setEditeModalVisible(false)}
      />
    </SafeAreaView>
  )
}

export default muniInfo

const styles = StyleSheet.create({
  container: {
    height: 865,
    backgroundColor: '#12B961'
  },
  scrollContainer: {
    backgroundColor: 'white',
    height: '100%'
  },
  heroConatiner: {
    width: '100%',
    height: 260,
  },
  imageStyle: {
    width: '100%',
    height: '70%'
  },
  whiteBackground: {
    width: '100%',
    height: '20%',
    backgroundColor: 'white'
  },
  textContainer: {
    width: '85%',
    height: '70%',
    position: 'absolute',
    backgroundColor: 'white',
    left: 30,
    top: 50,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleSyle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    color: '#12B961',
    paddingBottom: 15
  },
  subTitleSyle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#12B961',
    paddingTop: 15
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: '#12B961',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonsConatiner: {
    width: 240,
    height: 100,
    position: 'absolute',
    bottom: 90,
    right: 60,
    backgroundColor: '#12B961',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -4, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonContainer: {
    width: '95%',
    height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  addButtonContainerEvent: {
    width: '95%',
    height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
})