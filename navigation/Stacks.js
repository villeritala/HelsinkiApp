import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Kirjautuminen" component={LoginScreen}/>
            <Stack.Screen options={{headerShown: false}} name="Koti" component={HomeScreen}/>
        </Stack.Navigator>
        
    );
}

export default StackNav;