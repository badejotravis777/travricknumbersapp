import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

const GameModeScreen = ({ navigation, route }) => {
  const { user } = route.params || { user: { username: 'Guest' } }; // Fallback user
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(30);
  const [userPoints, setUserPoints] = useState(0);
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [currentMode, setCurrentMode] = useState('Beginner'); // Default mode

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setGuess('');
  };

  const calculatePoints = () => {
    switch (currentMode) {
      case 'Beginner':
        return 5;
      case 'Intermediate':
        return 10;
      case 'Expert':
        return 15;
      default:
        return 0;
    }
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess, 10); // Ensure input is a number
    if (isNaN(guessNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid number!');
      return;
    }

    if (guessNumber === targetNumber) {
      Alert.alert('Congratulations!', 'Correct! You win!');
      setUserPoints((prev) => prev + calculatePoints());

      // Save to history
      saveGameToHistory(userPoints + calculatePoints(), attempts + 1);

      initializeGame();
    } else if (guessNumber < targetNumber) {
      Alert.alert('Try Again', 'Your guess is too low!');
    } else {
      Alert.alert('Try Again', 'Your guess is too high!');
    }

    setAttempts((prev) => prev + 1);

    if (attempts + 1 >= maxAttempts) {
      Alert.alert('Game Over', `The correct number was ${targetNumber}`);
      // Save to history
  saveGameToHistory(userPoints, attempts + 1);

      initializeGame();
    }
  };

  const saveGameToHistory = (points, totalAttempts) => {
    // Placeholder for saving game data
    console.log(`Game saved: ${points} points, ${totalAttempts} attempts`);
  };

  const selectMode = (mode) => {
    setCurrentMode(mode);
    if (mode === 'Beginner') {
      setMaxAttempts(30);
    } else if (mode === 'Intermediate') {
      setMaxAttempts(20);
    } else if (mode === 'Expert') {
      setMaxAttempts(10);
    }
    initializeGame();
  };

  const logOut = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user.username}!</Text>
      <Text style={styles.title}>Select Game Mode</Text>
      <TouchableOpacity style={styles.button} onPress={() => selectMode('Beginner')}>
        <Text style={styles.buttonText}>Beginner (30 Attempts)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => selectMode('Intermediate')}>
        <Text style={styles.buttonText}>Intermediate (20 Attempts)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => selectMode('Expert')}>
        <Text style={styles.buttonText}>Expert (10 Attempts)</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Game Mode: {currentMode}</Text>
      <Text style={styles.subTitle}>Attempts Left: {maxAttempts - attempts}</Text>
      <Text style={styles.subTitle}>Points: {userPoints}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your guess"
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
      />
      <TouchableOpacity style={styles.button} onPress={handleGuess}>
        <Text style={styles.buttonText}>Submit Guess</Text>
      </TouchableOpacity>

      {/* Navigation Links */}
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Tutorial')}>
        <Text style={styles.navButtonText}>Go to Tutorial</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('GameHistory')}>
        <Text style={styles.navButtonText}>View Game History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={logOut}>
        <Text style={styles.navButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  welcome: { fontSize: 20, color: '#FFA500', marginBottom: 20 },
  title: { fontSize: 24, color: '#FFA500', fontWeight: 'bold', marginBottom: 20 },
  subTitle: { fontSize: 18, color: '#fff', marginVertical: 10 },
  button: {
    padding: 10,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    width: '80%',
    marginVertical: 10,
  },
  navButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  navButtonText: { color: '#FFA500', fontWeight: 'bold' },
});

export default GameModeScreen;
