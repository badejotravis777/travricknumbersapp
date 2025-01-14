import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameHistory = ({ navigation }) => {
  const [gameHistory, setGameHistory] = useState([]);

  // Fetch game history from AsyncStorage
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('gameHistory');
        if (history) {
          setGameHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error fetching game history:', error);
      }
    };
    fetchHistory();
  }, []);

  // Clear all game history
  const clearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all game history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('gameHistory');
              setGameHistory([]);
              Alert.alert('Success', 'Game history cleared!');
            } catch (error) {
              console.error('Error clearing game history:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game History</Text>
      {gameHistory.length === 0 ? (
        <Text style={styles.noHistoryText}>No game history available.</Text>
      ) : (
        <>
          <FlatList
            data={gameHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>
                  {item.date} - Mode: {item.level} - Score: {item.score} - Outcome: {item.outcome}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
            <Text style={styles.clearButtonText}>Clear History</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffa500',
  },
  noHistoryText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  historyItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ffa500',
    borderRadius: 8,
  },
  historyText: {
    color: '#000',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#ffa500',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameHistory;
