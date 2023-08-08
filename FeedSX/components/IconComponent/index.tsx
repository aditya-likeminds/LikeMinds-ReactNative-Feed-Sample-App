import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const IconComponent = ({onIconPress,displayIcon}:any) => {
  return (
    <TouchableOpacity onPress={onIconPress? () => onIconPress('pressed') : () => null}>  
        {displayIcon()}
    </TouchableOpacity>
  )
}

export default IconComponent