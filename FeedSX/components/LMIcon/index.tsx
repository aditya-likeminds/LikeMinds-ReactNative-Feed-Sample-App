import { TouchableOpacity} from 'react-native';
import React from 'react';
import {IconUI} from '../../models/iconModel';

const LMIcon = ({onIconPress, displayIcon}: IconUI) => {
  return (
    <TouchableOpacity
      onPress={onIconPress ? event => onIconPress(event) : () => null}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      {displayIcon()}
    </TouchableOpacity>
  );
};

export default LMIcon;
