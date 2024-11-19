import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { GameContext } from '../App';

const HistoryScreen = () => {
  const { gameHistory } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game History</Text>
      <FlatList
        data={gameHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            Target: {item.targetNumber}, Attempts: {item.attempts}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
  item: { fontSize: 16, marginVertical: 5 },
});

export default HistoryScreen;
