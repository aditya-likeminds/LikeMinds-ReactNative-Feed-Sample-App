import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles'
import { PostUI } from '../../../Models/PostModel'

const ImagePost = ({
  mediaUrl,
}: PostUI) => {
  return (
    <View style={styles.postMedia}>
        <Image source={{uri: mediaUrl}} resizeMode={'contain'} style={styles.mediaDimensions} />
    </View>
  )
}

export default ImagePost