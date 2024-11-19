import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('user'); // Check for logged-in user data
      setTimeout(() => {
        if (user) {
            navigation.replace('GameMode'); // Navigate to GameScreen for logged-in users
        } else {
          navigation.replace('WelcomeScreen'); // Navigate to WelcomeScreen for new users
        }
      }, 3000); // Wait for 3 seconds
    };

    checkLogin();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Replace with your actual logo path
        style={styles.logo}
      />
      <Text style={styles.text}>Welcome to Travrick</Text>
      <ActivityIndicator size="large" color="#FFA500" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Background color you prefer
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20, // Adds space between the logo and text
  },
  text: {
    fontSize: 24,
    color: '#FFA500', // Orange color for text
    fontWeight: 'bold',
  },
  spinner: {
    marginTop: 20, // Adds space between text and the spinner
  },
});

export default SplashScreen;
