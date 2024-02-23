import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './Navigation/Routes';

export default function Navigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
