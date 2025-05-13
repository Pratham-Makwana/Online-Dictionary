import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {FavoritesProvider} from './src/contexts/FavoritesContext';
import {Colors} from './src/types/dictionaryTypes';

const App = () => {
  return (
    <FavoritesProvider>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <AppNavigator />
    </FavoritesProvider>
  );
};

export default App;
