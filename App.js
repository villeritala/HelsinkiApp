import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import StackNav from './navigation/Stacks';

const App = ({ isLogedIn }) => {

  return(
    <NavigationContainer>
      {
        isLogedIn ? (
          <Tabs/>
        ) : (
          <StackNav/>
        )
      }
      
    </NavigationContainer>
    
  );
}

export default App;
