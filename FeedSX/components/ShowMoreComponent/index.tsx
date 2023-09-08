import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import STYLES from '../../constants/Styles';
import {PostUI} from '../../models/postModel';

const ShowMoreComponent = ({postTextStyle, postDetail}: PostUI) => {
  const {text} = {...postDetail};
  const [showMoreVisible, setShowMoreVisible] = useState(false);
  const [numberOfLine, setNumOfLine] = useState(0);

  // this handles the visibility of show more button
  useEffect(() => {
    setShowMoreVisible(false);
    // this checks the condition if the text takes more than 3 lines or have more than 500 characters
    if (
      (Dimensions.get('screen').width * 2) / 6.71 < text?.length ||
      text?.length > 500
    ) {
      setNumOfLine(3);
      setShowMoreVisible(true);
    } else {
      setShowMoreVisible(false);
    }
  }, [text]);

  return (
    <>
      <Text
        numberOfLines={numberOfLine}
        style={[styles.contentText, postTextStyle]}>
        {showMoreVisible ? text?.substring(0, 500) : text}
      </Text>
      {/* show more button section */}
      {showMoreVisible && (
        <TouchableOpacity
          onPress={() => {
            setShowMoreVisible(false);
            setNumOfLine(0);
          }}>
          <Text style={{fontFamily: STYLES.$FONT_FAMILY.REGULAR}}>
            Show more
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ShowMoreComponent;
