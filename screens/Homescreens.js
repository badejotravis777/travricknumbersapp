import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GameContext } from '../App';

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user.username}!</Text>
      <Button title="Start Game" onPress={() => navigation.navigate('Game')} />
      <Button title="View History" onPress={() => navigation.navigate('History')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcome: { fontSize: 20, marginBottom: 20 },
});

export default HomeScreen;
