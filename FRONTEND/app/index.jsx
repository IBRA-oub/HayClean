import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, Text, Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import images from '../constants/images';
import Features from '../components/indexComponents/Features';
import Role from '../components/indexComponents/Role';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const SwipeScreen = () => {
  const router = useRouter()
  const [showRole, setShowRole] = useState(false); 
  const onSkip = () => {
    router.push('muniHome')
    setShowRole(true); 
  };
  // Animation
  const translateX = useSharedValue(0);

 
  const truckStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value) }],
  }));


  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value * 1) }],
  }));

  const onGestureEvent = (event) => {
    translateX.value = Math.max(0, Math.min(event.nativeEvent.translationX, width * 0.8));
  };

  const onGestureEnd = () => {
    if (translateX.value > width * 0.5) {
      translateX.value = width;
    } else {
      translateX.value = 0;
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground source={images.background} style={styles.imageBackground}>

        <Text style={styles.text}>Swipe To Start</Text>
        <Animated.View style={[styles.greenBackground, backgroundStyle]} >
        {showRole ? <Role /> : <Features onSkip={onSkip} />}  
        </Animated.View>


        <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
          <Animated.View style={[styles.truckContainer, truckStyle]}>
            <Animated.Image source={images.truck} style={styles.truckImage} />
          </Animated.View>
        </PanGestureHandler>

      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default SwipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    left: 15,
    top: '42%',
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
    width: 70,
    textAlign: 'center'
  },
  greenBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#12B961',
    left: -width
  },
  truckContainer: {
    position: 'absolute',
    bottom: '45%',
    left: '10%',
  },
  truckImage: {
    width: 350,
    height: 150,
    resizeMode: 'contain',
  },
});
