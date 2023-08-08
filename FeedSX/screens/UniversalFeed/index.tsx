import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { NavigationService } from '../../navigation'
import { Button } from 'react-native-paper'

const UniversalFeed = () => {
  return (
    <TouchableOpacity onPress={() => {NavigationService.navigate('SinglePost')}}>
      <Text>UniversalFeed</Text>
    </TouchableOpacity>
  )
}

export default UniversalFeed