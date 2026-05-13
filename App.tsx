/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { PortfolioScreen } from './src/components';

function App() {
  return (
    <SafeAreaProvider>
      <PortfolioScreen />
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
