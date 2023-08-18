import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { PostUI } from '../../../Models/PostModel'

const PostContent = ({
  postText,
  postTextStyle
}: PostUI) => {
  return (
    <View style={styles.postDescription}>
      <Text style={[styles.contentText, postTextStyle]}>{postText}</Text>
    </View>
  )
}
export default PostContent