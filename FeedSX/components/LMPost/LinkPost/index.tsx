import { View, Text, Image } from 'react-native'
import React from 'react'
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import styles from './styles'

const LinkPost = () => {
  return (
    <View style={styles.postMedia}>
      <LinkPreview
        containerStyle={styles.previewContainer}
        enableAnimation
        text='https://flyer.chat'
      />
    </View>
  )
}

export default LinkPost