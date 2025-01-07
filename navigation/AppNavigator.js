// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GameModeScreen from './screens/GameModeScreen'; // Replace with the actual path to your screens
import TutorialScreen from '../screens/TutorialScreen';
import HomeScreen from '../screens/Homescreens';
import GameHistory from './screens/GameHistory';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import LogoutScreen from '../screens/Logoutscreens';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const GameNavigator = () => (
  <Stack.Navigator initialRouteName="GameMode">
    <Stack.Screen name="GameMode" component={GameModeScreen}  options={{ headerShown: false }} />
    <Stack.Screen name="Tutorial" component={TutorialScreen}  options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
    <Stack.Screen name="Signup" component={SignupScreen}  options={{ headerShown: false }} />
    <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false }} />
    <Stack.Screen name="GameHistory" component={GameHistory}  options={{ headerShown: false }} />
    <Stack.Screen name="Welcome" component={WelcomeScreen}  options={{ headerShown: false }} />
    <Stack.Screen name="Logout" component={WelcomeScreen}  options={{ headerShown: false }} />
    <Stack.Screen name="Logout" component={LogoutScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Drawer.Navigator initialRouteName="GameNavigator">
    <Drawer.Screen name="GameNavigator" component={GameNavigator} />
    <Drawer.Screen name="Welcome" component={WelcomeScreen} />
    <Drawer.Screen name="Login" component={LoginScreen} />
    <Drawer.Screen name="Signup" component={SignupScreen} />
    <Drawer.Screen name="Splash" component={SplashScreen} />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
