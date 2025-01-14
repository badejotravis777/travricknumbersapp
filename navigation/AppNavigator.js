// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameModeScreen from './screens/GameModeScreen'; // Replace with the actual path to your screens
import TutorialScreen from '../screens/TutorialScreen';
import HomeScreen from '../screens/Homescreens';
import GameHistoryScreen from './screens/GameHistoryScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import LogoutScreen from '../screens/Logoutscreens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
        headerMode="none"
      >
        <Stack.Screen name="Splash" component={SplashScreen}  />
        <Stack.Screen name="Welcome" component={WelcomeScreen}  />
        <Stack.Screen name="Login" component={LoginScreen}  />
        <Stack.Screen name="Signup" component={SignupScreen}  />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GameMode" component={GameModeScreen} />
        <Stack.Screen name="Tutorial" component={TutorialScreen}  />
        <Stack.Screen name="GameHistoryScreen" component={GameHistoryScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
