import {View, Text, TouchableOpacity, Dimensions, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {PostUI} from '../../../models/postModel';
import {LINK_ATTACHMENT_TYPE} from '../../../constants/Strings';
import ShowMoreComponent from '../../showMoreComponent';

const PostContent = ({postDetail, postTextStyle, postUserDetail}: PostUI) => {
  const {attachments} = {...postDetail};

  // filtering out the attachments which contains link
  const linkData = attachments?.filter(
    item => item.attachmentType === LINK_ATTACHMENT_TYPE,
  );

  return (
    <View style={styles.postDescription}>
      {/* this renders post text with show more functionality */}
      <ShowMoreComponent
        postTextStyle={postTextStyle}
        postDetail={postDetail}
        postUserDetail={postUserDetail}
      />

      {/* this renders all the links url attached */}
      {linkData &&
        linkData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              Linking.openURL(attachments[0]?.attachmentMeta?.ogTags?.url)
            }>
            <Text style={styles.linkText}>
              {item?.attachmentMeta?.ogTags?.url}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};
export default PostContent;
