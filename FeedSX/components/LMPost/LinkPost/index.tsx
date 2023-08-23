import {View, Text, Image} from 'react-native';
import React from 'react';
import {LinkPreview} from '@flyerhq/react-native-link-preview';
import styles from './styles';
import {PostUI} from '../../../Models/PostModel';

const LinkPost = ({postAttachments}: PostUI) => {
  return (
    <View style={styles.postMedia}>
      <LinkPreview
        containerStyle={styles.previewContainer}
        enableAnimation
        text={postAttachments && postAttachments[0]?.attachmentMeta?.ogTags.url}
      />
    </View>
  );
};

export default LinkPost;
