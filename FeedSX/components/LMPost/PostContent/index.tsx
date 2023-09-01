import {View, Text, TouchableOpacity, Dimensions, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {PostUI} from '../../../Models/PostModel';
import {LINK_ATTACHMENT_TYPE} from '../../../constants/Strings';
import STYLES from '../../../constants/Styles';

const PostContent = ({postDetail, postTextStyle}: PostUI) => {
  const {text,attachments} = {...postDetail};
  const [showMoreVisiible, setShowMoreVissible] = useState(false);
  const [numberOfLine, setNumOfLine] = useState(0);

  // filtering out the attachments which contains link
  const linkData = attachments?.filter(
    item => item.attachmentType === LINK_ATTACHMENT_TYPE,
  );

  useEffect(() => {
    setShowMoreVissible(false);
    // this checks the condition if the text takes more than 3 lines or have more than 500 characters
  if((Dimensions.get('screen').width*2/6.71) < text?.length || text?.length > 500) {
    setNumOfLine(3);
    setShowMoreVissible(true);  
  }else {
    setShowMoreVissible(false);
  }
  }, [text]);

  return (
    <View style={styles.postDescription}>
      {/* post description text */}
      <Text numberOfLines={numberOfLine} style={[styles.contentText, postTextStyle]}>{showMoreVisiible ? text?.substring(0, 500) : text}</Text>
      {/* show more button section */}
      {showMoreVisiible && (
        <TouchableOpacity
          onPress={() => {
            setShowMoreVissible(false);
            setNumOfLine(0);
          }}>
          <Text style={{fontFamily: STYLES.$FONT_FAMILY.REGULAR}}>Show more</Text>
        </TouchableOpacity>
      )}
      {/* this renders all the links url attached */}
      {linkData && (
        linkData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(attachments[0]?.attachmentMeta?.ogTags?.url)}>
            <Text style={styles.linkText}>
              {item?.attachmentMeta?.ogTags?.url}
            </Text>
            </TouchableOpacity>
          ))
      )}
    </View>
  );
};
export default PostContent;
