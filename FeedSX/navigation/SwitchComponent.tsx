import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CreatePost, LikesList, UniversalFeed} from '../screens';
import {navigationRef} from './RootNavigation';
import {useAppSelector} from '../store/store';
import {LMToast} from '../components';
import {
  CREATE_POST,
  LIKES_LIST,
  UNIVERSAL_FEED,
} from '../constants/screenNames';

const Stack = createStackNavigator();
const SwitchComponent = () => {
  const showToast = useAppSelector(state => state.loader.isToast);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={UNIVERSAL_FEED} component={UniversalFeed} />
          <Stack.Screen name={LIKES_LIST} component={LikesList} />
          <Stack.Screen name={CREATE_POST} component={CreatePost} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* this renders the toast message */}
      {showToast && <LMToast />}
    </>
  );
};

export default SwitchComponent;
