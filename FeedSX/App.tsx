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
import { PaperProvider } from 'react-native-paper';

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
          <PaperProvider>
            <SwitchComponent />
          </PaperProvider>
      </KeyboardAvoidingView>
    </ReduxProvider>
  );
}

export default App;
