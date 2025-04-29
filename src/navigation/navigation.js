import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ThemeScreen from '../screens/ThemeScreen';
import { SafeAreaView } from 'react-native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name='Home' component={HomeScreen} />
                    <Tab.Screen name='Themes' component={ThemeScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default AppNavigator;