import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PostDetail, UniversalFeed } from '../screens';
import { navigationRef } from './RootNavigation';
import SinglePostActions from '../screens/SinglePost/SinglePostActions';

const Stack = createStackNavigator();
const SwitchComponent = () => {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name={'UniversalFeed'} component={UniversalFeed} />
        <Stack.Screen name={'SinglePost'} component={SinglePostActions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SwitchComponent;
