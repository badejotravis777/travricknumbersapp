// Homescreens.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Tutorial')} style={styles.button}>
        <Text style={styles.buttonText}>Tutorial</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('GameHistory')} style={styles.button}>
        <Text style={styles.buttonText}>Game History</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Logout')} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ffa500', // Example button color
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // Example text color
    fontSize: 16,
  },
});
