import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconUI } from '../../Models/IconModel'

const LMIcon = ({onIconPress,displayIcon}: IconUI) => {
  return (
    <TouchableOpacity onPress={onIconPress? () => onIconPress() : () => null}>  
        {displayIcon()}
     </TouchableOpacity>
  )
}

export default LMIcon