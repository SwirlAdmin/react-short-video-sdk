//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Navigator from './src/utils/Navigator';
import {NativeBaseProvider, Box} from 'native-base';

// create a component
const App = () => {
  return (
    <NativeBaseProvider>
      <Navigator />
    </NativeBaseProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
