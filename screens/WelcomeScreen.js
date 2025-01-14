import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Travrick Numbers!</Text>
      <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { padding: 10, backgroundColor: '#ff9900', borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default WelcomeScreen;
