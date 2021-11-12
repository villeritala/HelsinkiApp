import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


const App = () => {

  return(
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
    
  );
}

export default App;
