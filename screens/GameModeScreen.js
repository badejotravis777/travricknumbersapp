import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameModeScreen = ({ navigation, route }) => {
  const { user } = route.params || { user: { username: 'Guest' } };
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(30);
  const [userPoints, setUserPoints] = useState(0);
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [currentMode, setCurrentMode] = useState('Beginner');
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const initializeGame = useCallback(() => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setGuess('');
    setHintsEnabled(currentMode !== 'Expert'); // Hints are disabled in Expert mode.
  }, [currentMode]);

  useEffect(() => {
    initializeGame();
    loadPoints();
  }, [initializeGame]);

  const savePoints = async (points) => {
    try {
      await AsyncStorage.setItem('userPoints', points.toString());
    } catch (error) {
      console.error('Failed to save points:', error);
    }
  };

  const loadPoints = async () => {
    try {
      const savedPoints = await AsyncStorage.getItem('userPoints');
      if (savedPoints) {
        setUserPoints(parseInt(savedPoints, 10));
      }
    } catch (error) {
      console.error('Failed to load points:', error);
    }
  };

  const saveGameResult = async (score, level, outcome) => {
    try {
      const newRecord = {
        date: new Date().toLocaleDateString(),
        score,
        level,
        outcome,
      };
      const storedHistory = await AsyncStorage.getItem('gameHistory');
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      history.push(newRecord);
      await AsyncStorage.setItem('gameHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving game result:', error);
    }
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

  const handleGuess = async () => {
    const guessNumber = parseInt(guess, 10);
    if (isNaN(guessNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid number!');
      return;
    }

    if (guessNumber === targetNumber) {
      Alert.alert('Congratulations!', 'Correct! You win!');
      const pointsEarned = calculatePoints();
      const newPoints = userPoints + pointsEarned;
      setUserPoints(newPoints);
      await saveGameResult(pointsEarned, currentMode, 'Win');
      savePoints(newPoints);
      initializeGame();
    } else if (hintsEnabled) {
      // Show hint messages only if hints are enabled
      if (guessNumber < targetNumber) {
        Alert.alert('Try Again', 'Your guess is too low!');
      } else {
        Alert.alert('Try Again', 'Your guess is too high!');
      }
    }

    setAttempts((prev) => prev + 1);

    // Disable hints after 10 attempts in Intermediate mode
    if (currentMode === 'Intermediate' && attempts + 1 >= 10) {
      setHintsEnabled(false);
    }

    // Check if max attempts are reached
    if (attempts + 1 >= maxAttempts) {
      Alert.alert('Game Over', `The correct number was ${targetNumber}`);
      await saveGameResult(0, currentMode, 'Loss');
      initializeGame();
    }
  };

  const selectMode = (mode) => {
    setCurrentMode(mode);
    if (mode === 'Beginner') {
      setMaxAttempts(30);
    } else if (mode === 'Intermediate') {
      setMaxAttempts(15);
    } else if (mode === 'Expert') {
      setMaxAttempts(10);
    }
    initializeGame();
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.hamburger}
          onPress={() => setMenuVisible((prev) => !prev)}
        >
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>

        {isMenuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Tutorial');
              }}
            >
              <Text style={styles.menuText}>Go to Tutorial</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('GameHistoryScreen');
              }}
            >
              <Text style={styles.menuText}>View Game History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                Alert.alert('Logged Out', 'You have been logged out.');
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.menuText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.welcome}>Welcome, {user.username || 'Guest'}!</Text>
        <Text style={styles.title}>Select Your Game Mode</Text>

        <View style={styles.modeContainer}>
          <TouchableOpacity style={styles.modeButton} onPress={() => selectMode('Beginner')}>
            <Text style={styles.modeText}>Beginner</Text>
            <Text style={styles.attemptsText}>30 Attempts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modeButton} onPress={() => selectMode('Intermediate')}>
            <Text style={styles.modeText}>Intermediate</Text>
            <Text style={styles.attemptsText}>15 Attempts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modeButton} onPress={() => selectMode('Expert')}>
            <Text style={styles.modeText}>Expert</Text>
            <Text style={styles.attemptsText}>10 Attempts</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Current Mode: {currentMode}</Text>
          <Text style={styles.infoText}>Attempts Left: {maxAttempts - attempts}</Text>
          <Text style={styles.infoText}>Your Points: {userPoints}</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter your guess"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={guess}
          onChangeText={setGuess}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleGuess}>
          <Text style={styles.submitText}>Submit Guess</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000', // Updated to black background
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hamburger: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    padding: 10,
  },
  hamburgerText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 90,
    left: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    zIndex: 1000,
  },
  menuItem: {
    marginVertical: 5,
  },
  menuText: {
    fontSize: 18,
    color: '#000',
  },
  welcome: {
    fontSize: 22,
    color: '#FFA500',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  modeButton: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '30%',
  },
  modeText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  attemptsText: {
    fontSize: 14,
    color: '#000',
  },
  infoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#FFF',
    marginVertical: 5,
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 8,
    color: '#FFF',
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    width: '50%',
    alignItems: 'center',
  },
  submitText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameModeScreen;
