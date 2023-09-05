import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import { LoaderUI } from '../../Models/LoaderModel';

const LMLoader = ({color, size}: LoaderUI) => {
  return <ActivityIndicator size={size ? size : 'large'} color={color? color : '#5046E5'} />;
};

export default LMLoader;
