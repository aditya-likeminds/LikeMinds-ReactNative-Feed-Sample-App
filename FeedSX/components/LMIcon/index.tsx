import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const LMIcon = ({onIconPress,displayIcon}:any) => {
  return (
    <TouchableOpacity onPress={onIconPress? () => onIconPress() : () => null}>  
        {displayIcon()}
    </TouchableOpacity>
  )
}

export default LMIcon