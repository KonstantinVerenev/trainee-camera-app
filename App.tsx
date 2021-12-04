import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './src/screens/MainScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
