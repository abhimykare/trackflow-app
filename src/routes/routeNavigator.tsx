import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DetailedViewScreen from '../screens/DetailedViewScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreens';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import PersonalInformationScreen from '../screens/Profile/PersonalInformationScreen';
import AddSalaryScreen from '../screens/Profile/AddSalaryScreen';
import SecurityScreen from '../screens/Profile/SecurityScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import AppearanceScreen from '../screens/Profile/AppearanceScreen';
import NotificationsScreen from '../screens/Profile/NotificationsScreen';
import FAQScreen from '../screens/Profile/FAQScreen';
import ContactUsScreen from '../screens/Profile/ContactUsScreen';
import AboutTrackFlowScreen from '../screens/Profile/AboutTrackFlowScreen';
import { tokenManager } from '../config/api';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStatus } from '../services/authServices';

export type RootStackParamList = {
  Home: undefined;
  DetailedView: { month: string };
  Register: undefined;
  Login: undefined;
  Profile: undefined;
  PersonalInformation: undefined;
  AddSalary: undefined;
  Security: undefined;
  Settings: undefined;
  Appearance: undefined;
  Notifications: undefined;
  FAQ: undefined;
  ContactUs: undefined;
  AboutTrackFlow: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

const Stack = createStackNavigator<RootStackParamList>();

// Loading Screen Component
const LoadingScreen: React.FC = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.logoEmoji}>📊</Text>
    <Text style={styles.appName}>TrackFlow</Text>
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

// Auth Stack (Login/Register screens)
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#050510' },
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Main App Stack (Home and other screens)
const AppStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#050510' },
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="DetailedView" component={DetailedViewScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen
      name="PersonalInformation"
      component={PersonalInformationScreen}
    />
    <Stack.Screen name="AddSalary" component={AddSalaryScreen} />
    <Stack.Screen name="Security" component={SecurityScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Appearance" component={AppearanceScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="FAQ" component={FAQScreen} />
    <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    <Stack.Screen name="AboutTrackFlow" component={AboutTrackFlowScreen} />
  </Stack.Navigator>
);

const RouteNavigator = () => {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuthStatus();

  // Initialize user data from storage on app start
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('[RouteNavigator] 🚀 Initializing app...');

      const token = await tokenManager.getToken();
      const userData = await tokenManager.getUserData();

      console.log('[RouteNavigator] 🔍 Checking stored data:');
      console.log('[RouteNavigator] Token exists:', !!token);
      console.log('[RouteNavigator] User data exists:', !!userData);

      if (token && userData) {
        console.log(
          '[RouteNavigator] ✅ Setting cached user data:',
          userData.fullName,
        );
        // Set the user data in React Query cache
        queryClient.setQueryData(['currentUser'], userData);
      } else {
        console.log('[RouteNavigator] ℹ️ No cached user data found');
      }
    } catch (error) {
      console.error('[RouteNavigator] ❌ Error initializing app:', error);
    } finally {
      setIsInitialized(true);
    }
  };

  // Show loading screen while initializing
  if (!isInitialized || isLoading) {
    return (
      <NavigationContainer>
        <LoadingScreen />
      </NavigationContainer>
    );
  }

  console.log('[RouteNavigator] 🎯 Navigation Decision:');
  console.log('[RouteNavigator] - Is Authenticated:', isAuthenticated);
  console.log('[RouteNavigator] - Current User:', user?.fullName || 'None');
  console.log(
    '[RouteNavigator] - Showing:',
    isAuthenticated ? 'App Stack' : 'Auth Stack',
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a15',
  },
  logoEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  appName: {
    color: '#4facfe',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
});

export default RouteNavigator;
