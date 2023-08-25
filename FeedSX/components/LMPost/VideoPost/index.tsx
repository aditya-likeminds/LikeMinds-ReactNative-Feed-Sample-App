import {View, Text, Image} from 'react-native';
import React from 'react';
import {PostUI} from '../../../Models/PostModel';
import styles from './styles';
import {VIDEO_ATTACHMENT_TYPE} from '../../../constants/Strings';

const VideoPost = ({postAttachments}: PostUI) => {
  // filtering out the attachment which contains video
  const VideoData = postAttachments?.filter(
    item => item?.attachmentType === VIDEO_ATTACHMENT_TYPE,
  );
  return (
    <View style={styles.postMedia}>
      <View style={styles.mediaDimensions}></View>
    </View>
  );
};

export default VideoPost;
