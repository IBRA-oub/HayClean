import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images';
import Line from '../../components/citizenComponents/Line';
import AllNews from '../../components/citizenComponents/AllNews';
import AllEvent from '../../components/citizenComponents/AllEvent';

const info = () => {
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

        <View style={styles.heroConatiner}>
          <Image
            source={images.background}
            style={styles.imageStyle}
          />
          <View style={styles.whiteBackground}></View>
          <View style={styles.textContainer}>
            <Text style={styles.titleSyle}>Environmental & Community Updates</Text>
            <Line />
            <Text style={styles.subTitleSyle}>you can se all updates and news about your city</Text>
          </View>
        </View>
        <AllNews />
        <Line />
        <AllEvent />

      </ScrollView>
    </SafeAreaView>
  )
}

export default info

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
  }
})