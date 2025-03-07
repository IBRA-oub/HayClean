import { ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images';
import NearestDumps from '../../components/citizenComponents/NearestDumps';
import CollectionPoint from '../../components/citizenComponents/CollectionPoint';
import NewsUpdate from '../../components/citizenComponents/NewsUpdate';
import { useRouter } from 'expo-router';

const home = () => {
  const [refreshing, setRefreshing] = useState(false);
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
      >

        <View>
          <ImageBackground
            style={styles.heroSection}
            source={images.homeBg}
          >
            <View style={styles.shadowView}  >
              <TouchableOpacity style={styles.reportButton} onPress={() => router.push('reportDump')}>
                <Text style={styles.illegalText}>
                  REPORT ILLEGAL DUMP
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <NearestDumps/>
        <CollectionPoint/>
        <NewsUpdate/>


      </ScrollView>

    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    height: 865,
    backgroundColor: '#12B961'
  },
  scrollContainer: {
    backgroundColor: 'white',
    height: '100%'
  },
  heroSection: {
    width: '100%',
    height: 250,
    backgroundColor: 'black',
    position: 'relative'
  },
  shadowView: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#12b96163'
  },
  reportButton: {
    width: '80%',
    height: 44,
    backgroundColor: 'white',
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  illegalText: {
    fontSize: 20,
    fontWeight:'600',
    color:'#12B961'
  }
})