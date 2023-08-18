import { View, Text, Image } from 'react-native'
import React from 'react'
import { PostUI } from '../../../Models/PostModel'
import styles from './styles'

const VideoPost = ({
  mediaUrl,
}: PostUI) => {
  return (
    <View style={styles.postMedia}>
        <View style={styles.mediaDimensions}></View>
    </View>
  )
}

export default VideoPost