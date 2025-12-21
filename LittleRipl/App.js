import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { ThemeProvider } from './context/ThemeContext';
import { GlobalDataProvider } from './context/GlobalDataContext';
import HomeScreen from './screens/home';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'BarlowCondensed-SemiBold': require('./assets/fonts/BarlowCondensed-SemiBold.ttf'),
    'DMSans-Regular': require('./assets/fonts/DMSans_18pt-Regular.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans_18pt-Medium.ttf'),
    'DMSans-SemiBold': require('./assets/fonts/DMSans_18pt-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GlobalDataProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GlobalDataProvider>
  );
}