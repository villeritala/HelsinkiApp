import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import Tabs from './Tabs';

const Stack = createStackNavigator();

const StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Kirjautuminen" component={LoginScreen}/>
            <Stack.Screen options={{headerShown: false}} name="Tabs" component={Tabs}/>
        </Stack.Navigator>
        
    );
}

export default StackNav;