import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import styles from './styles';
import {PostUI} from '../../../models/postModel';

const LinkPost = ({postDetail}: PostUI) => {
  const {attachments} = {...postDetail}
  return (
    <TouchableOpacity style={styles.postMedia} onPress={() => Linking.openURL(attachments[0]?.attachmentMeta?.ogTags?.url)}>
      {/* link preview image */}
      <View style={styles.previewContainer}>
        <Image source={attachments && { uri : attachments[0]?.attachmentMeta?.ogTags?.image}} style={styles.previewImage}/>
          {/* link preview data */}
        <View style={styles.previewDetailView}>
        <Text style={styles.previewTitle}>{attachments[0]?.attachmentMeta?.ogTags?.title}</Text>
        <Text style={styles.previewDescription}>{attachments[0]?.attachmentMeta?.ogTags?.description}</Text>
        <Text style={styles.previewLink}>{attachments[0]?.attachmentMeta?.ogTags?.url}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LinkPost;
