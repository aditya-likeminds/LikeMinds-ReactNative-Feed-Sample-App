import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {PostUI} from '../../../Models/PostModel';
import { LINK_ATTACHMENT_TYPE } from '../../../constants/Strings';
import { FlashList } from '@shopify/flash-list';

const PostContent = ({postText, postTextStyle, postAttachments}: PostUI) => {
  // filtering out the attachments which contains link
  const linkData = postAttachments?.filter(item => item.attachmentType === LINK_ATTACHMENT_TYPE);

  return (
    <View style={styles.postDescription}>
      {/* post description text */}
      <Text style={[styles.contentText, postTextStyle]}>{postText}</Text>

      {/* this renders all the links url attached */}
      {linkData && (
        <FlashList
          data={linkData}
          renderItem={({item}) => (
            <Text style={styles.linkText}>
              {item?.attachmentMeta?.ogTags.url}
            </Text>
          )}
        />
      )}
    </View>
  );
};
export default PostContent;
