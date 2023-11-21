import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import store from './store/store';
import SwitchComponent from './navigation/SwitchComponent';

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SwitchComponent />
      </KeyboardAvoidingView>
    </ReduxProvider>
  );
}

export default App;
