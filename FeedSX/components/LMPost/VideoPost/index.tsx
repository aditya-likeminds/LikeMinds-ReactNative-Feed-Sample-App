import {View, Text, Image} from 'react-native';
import React from 'react';
import {PostUI} from '../../../Models/PostModel';
import styles from './styles';
import {VIDEO_ATTACHMENT_TYPE} from '../../../constants/Strings';

const VideoPost = ({postDetail}: PostUI) => {
  const {attachments} = {...postDetail}

  // filtering out the attachment which contains video
  const VideoData = attachments?.filter(
    item => item?.attachmentType === VIDEO_ATTACHMENT_TYPE,
  );
  return (
    <View style={styles.postMedia}>
      <View style={styles.mediaDimensions}>
        <Text style={{color:'white'}}>Video view</Text>
      </View>
    </View>
  );
};

export default VideoPost;
