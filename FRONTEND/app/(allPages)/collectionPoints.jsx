import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import CollectionPointCard from '../../components/citizenComponents/CollectionPointCard';
import MapView, { Marker } from 'react-native-maps';
import useCollectionPoint from '../../hooks/citizenHooks/useCollectionPoint';


const CollectionPoints = () => {
  const router = useRouter();
  const { userLocation, distances, viewMode, setViewMode, selectedLocation, onSelectPoint } = useCollectionPoint();

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: '16%', paddingLeft: 10 }}>
          <AntDesign name="left" size={34} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.textStyle}>Collection Point</Text>
        </View>
        <View style={{ width: 65 }}></View>
      </View>

      <View style={styles.switchContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, viewMode === 'map' && styles.activeButton]}
            onPress={() => setViewMode('map')}
          >
            <Text style={[styles.buttonText, viewMode === 'map' && styles.activeText]}>Map</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, viewMode === 'list' && styles.activeButton]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.buttonText, viewMode === 'list' && styles.activeText]}>List</Text>
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'list' ? (
        <ScrollView style={styles.scrollView}>
          {distances?.map((item, index) => (
            <CollectionPointCard key={index} item={item} index={index + 1} onSelect={onSelectPoint} />
          ))}
        </ScrollView>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(selectedLocation?.latitude || distances[0]?.latitude) || 0,
            longitude: parseFloat(selectedLocation?.longitude || distances[0]?.longitude) || 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="You"
              pinColor="blue"
            />
          )}
          {distances?.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude),
              }}
              title={`Collection Point ${index + 1}`}
              description={item.city}
            />
          ))}
        </MapView>

      )}
    </View>
  );
};

export default CollectionPoints;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  navbarContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#12B961',
    paddingTop: 40,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  switchContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '50%',
    height: '70%',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  activeButton: {
    backgroundColor: '#12B961',
    overflow: 'hidden',
    borderRadius: 19
  },
  buttonText: {
    fontSize: 17,
    color: 'black',
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#12B961',
    margin: 10,
    borderRadius: 10,
  },
  map: {

    flex: 1,
    margin: 10,
    borderRadius: 10,
  }

});
