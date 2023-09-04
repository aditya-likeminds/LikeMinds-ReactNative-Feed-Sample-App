import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {PostUI} from '../../../Models/PostModel';
import {IMAGE_ATTACHMENT_TYPE} from '../../../constants/Strings';

const ImagePost = ({postAttachments}: PostUI) => {
  // filtering out the attachment which contains image
  const ImageData = postAttachments?.filter(
    item => item?.attachmentType === IMAGE_ATTACHMENT_TYPE,
  );
  return (
    <View style={styles.postMedia}>
      <Image
        source={{uri: ImageData?.[0]?.attachmentMeta.url}}
        resizeMode={'contain'}
        style={styles.mediaDimensions}
      />
    </View>
  );
};

export default ImagePost;
