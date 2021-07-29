/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import configContextProvider from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Navigation from './src/';

const ContextProvider = configContextProvider();

const App = () => {
  return (
    <ContextProvider>
      <SafeAreaProvider></SafeAreaProvider>
    </ContextProvider>
  );
};

export default App;
