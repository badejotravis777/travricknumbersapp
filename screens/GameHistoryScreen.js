// GameHistory.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const GameHistory = () => {
  const [gameHistory, setGameHistory] = useState([]);

  // Simulate fetching game history data (you can replace this with async storage or an API call)
  useEffect(() => {
    const fetchHistory = async () => {
      // Replace with actual logic to fetch game history
      const history = [
        { id: '1', date: '2024-11-15', score: 100, level: 'Beginner' },
        { id: '2', date: '2024-11-14', score: 150, level: 'Intermediate' },
        { id: '3', date: '2024-11-13', score: 200, level: 'Expert' },
      ];
      setGameHistory(history);
    };

    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game History</Text>
      {gameHistory.length === 0 ? (
        <Text style={styles.noHistoryText}>No game history available.</Text>
      ) : (
        <FlatList
          data={gameHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.itemText}>Date: {item.date}</Text>
              <Text style={styles.itemText}>Score: {item.score}</Text>
              <Text style={styles.itemText}>Level: {item.level}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Black background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffa500', // Orange text
  },
  noHistoryText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  historyItem: {
    backgroundColor: '#222',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    color: '#fff',
  },
});

export default GameHistory;
