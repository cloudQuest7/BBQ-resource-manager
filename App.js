import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar, Platform, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Fraunces_700Bold, Fraunces_500Medium } from '@expo-google-fonts/fraunces';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, shadow } from './src/theme';
import { UserProvider, useUser } from './src/context/UserContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import AddResourceScreen from './src/screens/AddResourceScreen';
import AddPitScreen from './src/screens/AddPitScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PitsScreen from './src/screens/PitsScreen';
import PitDetailScreen from './src/screens/PitDetailScreen';
import ResourceDetailScreen from './src/screens/ResourceDetailScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

// Reusable screen for coming soon pages
function ComingSoonScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Text style={{ fontFamily: fonts.headingMedium, fontSize: 24, color: colors.primary }}>Coming Soon</Text>
    </View>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Ensure no text labels!
        tabBarStyle: {
          backgroundColor: '#FDF4E3', 
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 12,
          height: Platform.OS === 'ios' ? 85 : 70, // Flush with the bottom
        }
      }}
    >
      <Tab.Screen 
        name="DashboardTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'apps' : 'apps-outline'} size={28} color={focused ? colors.primary : colors.textMuted} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="InventoryTab" 
        component={PitsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'reader' : 'reader-outline'} size={28} color={focused ? colors.primary : colors.textMuted} />
          ),
        }}
      />

      {/* Floating Center Button */}
      <Tab.Screen 
        name="AddAction" 
        component={AddResourceScreen} 
        options={{
          tabBarIcon: () => (
             <View style={{
                 width: 56,
                 height: 56,
                 borderRadius: 28,
                 backgroundColor: colors.primary,
                 justifyContent: 'center',
                 alignItems: 'center',
                 marginBottom: 20, // Elevate it slightly using margin
                 ...shadow.float,
             }}>
                 <Ionicons name="add" size={32} color={colors.white} />
             </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('AddResource');
          }
        })}
      />

      <Tab.Screen 
        name="EventsTab" 
        component={ComingSoonScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={28} color={focused ? colors.primary : colors.textMuted} />
          ),
        }}
      />

      <Tab.Screen 
        name="AccountTab" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={28} color={focused ? colors.primary : colors.textMuted} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ─── ROOT NAVIGATOR (handles auth flow) ───────────────────────────────────
function RootNavigator() {
  const { user } = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'fade',
      }}
    >
      {user ? (
        // User is logged in - show main app
        <>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen 
            name="AddResource" 
            component={AddResourceScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="AddPit" 
            component={AddPitScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen name="PitDetail" component={PitDetailScreen} />
          <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} />
        </>
      ) : (
        // User is not logged in - show login
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ animationEnabled: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Fraunces_700Bold,
    Fraunces_500Medium,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}

