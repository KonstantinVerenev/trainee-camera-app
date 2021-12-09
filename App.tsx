import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { Store } from './store';
import MainScreen from './src/screens/MainScreen';
import CameraScreen from './src/screens/CameraScreen';

export const MAIN_SCREEN = 'MainScreen';
export const CAMERA_SCREEN = 'CameraScreen';

export type RootStackParamList = {
  MainScreen: undefined;
  CameraScreen: { uri: string; isHereFromGallery: boolean } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={MAIN_SCREEN}>
          <Stack.Screen name={MAIN_SCREEN} component={MainScreen} />
          <Stack.Screen name={CAMERA_SCREEN} component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
