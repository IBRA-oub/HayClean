import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../../constants/images'
import ReportDumps from '../../components/municipalityComponents/ReportDumps'
import CollectionPointMang from '../../components/municipalityComponents/CollectionPointMang'

const muniHome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={images.municipality}
          style={styles.image}
        />
      </View>
      <ReportDumps/>
      <CollectionPointMang/>

    </View>
  )
}

export default muniHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  hero: {
    width: '100%',
    height: 220,  
    justifyContent:'flex-end'

  },
  image:{
    width:'100%',
    height:'90%'
  }
})