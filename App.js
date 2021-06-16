import React from 'react';
import {StatusBar, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/app/store';
import AppInside from './AppInside';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppInside />
    </Provider>
  );
};

export default App;
