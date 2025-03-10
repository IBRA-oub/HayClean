import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images';

const useMunciProfile = () => {
    
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({
      image: images.user,
      name: 'Safi Municipality',
      email: 'Safipnct@interieur.gov.ma',
      city: 'Safi, MA',
  });

  const handleDelete = () => {
      Alert.alert('Confirm Delete', 'Are you sure you want to delete?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Confirm', onPress: () => console.log('User Deleted') },
      ]);
  };

  const handleLogout = () => {
      Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Confirm', onPress: () => console.log('User Logged Out') },
      ]);
  };

  const handleEditSubmit = (newData) => {
      setUserData(newData);
      setModalVisible(false);
  };
  return {
    isModalVisible,
    userData,
    setModalVisible,
    handleDelete,
    handleLogout,
    handleEditSubmit

  }
}

export default useMunciProfile

const styles = StyleSheet.create({})