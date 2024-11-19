import React from 'react';
import {  Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

const TutorialScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>How to Play</Text>
      <Video
        source={require('../assets/tutorial.mp4')}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
      <Text style={styles.instructions}>
        1. Select a game mode (Beginner, Intermediate, or Expert).{'\n'}
        2. Guess the number within the given attempts.{'\n'}
        3. Use hints wisely (available in Beginner mode only).{'\n'}
        4. Earn points based on your performance.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameMode')}>
        <Text style={styles.buttonText}>Start Playing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 20 },
  title: { fontSize: 24, color: '#FFA500', fontWeight: 'bold', marginBottom: 20 },
  video: { width: '100%', height: 200, marginBottom: 20 },
  instructions: { color: '#fff', textAlign: 'center', marginBottom: 20 },
  button: { padding: 10, backgroundColor: '#FFA500', borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default TutorialScreen;
