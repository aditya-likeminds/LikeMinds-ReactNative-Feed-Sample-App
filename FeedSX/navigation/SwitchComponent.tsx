import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LikesList, UniversalFeed} from '../screens';
import {navigationRef} from './RootNavigation';
import {useAppSelector} from '../store/store';
import LMToast from '../components/LMToast';

const Stack = createStackNavigator();
const SwitchComponent = () => {
  const showToast = useAppSelector(state => state.loader.isToast);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name={'UniversalFeed'} component={UniversalFeed} />
          <Stack.Screen name={'LikesList'} component={LikesList} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* this renders the toast message */}
      {showToast && <LMToast />}
    </>
  );
};

export default SwitchComponent;
