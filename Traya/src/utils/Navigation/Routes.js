import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home';
import HairTest from '../../screens/HairTest';
import ShortVideo from '../../screens/ShortVideo';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HairTest" component={HairTest} />
        <Stack.Screen name="SVideo" component={ShortVideo} />
      </Stack.Navigator>
    </>
  );
}

export default AppStack;
