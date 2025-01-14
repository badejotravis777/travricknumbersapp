import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-url-polyfill/auto';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import TutorialScreen from './screens/TutorialScreen';
import GameModeScreen from './screens/GameModeScreen';
import LogoutScreen from './screens/Logoutscreens';
import GameHistoryScreen from './screens/GameHistoryScreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide header for splash screen
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GameMode" component={GameModeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Logout" component={LogoutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GameHistoryScreen" component={GameHistoryScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
