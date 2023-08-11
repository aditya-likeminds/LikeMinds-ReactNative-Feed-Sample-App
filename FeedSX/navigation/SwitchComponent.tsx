import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UniversalFeed } from '../screens';
import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();
const SwitchComponent = () => {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name={'UniversalFeed'} component={UniversalFeed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SwitchComponent;
