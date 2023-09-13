import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import AvatarIcon from '../../avatarIcon';
import STYLES from '../../../constants/Styles';
import LMIcon from '../../LMIcon';
import {PostUI} from '../../../models/postModel';
import {PostActionListModal} from '../../../customModals';
import { timeStamp } from '../../../utils/timeStamp';

const PostHeader = ({
  avatarStyle,
  nameInitialViewStyle,
  nameInitialTextStyle,
  postDetail,
  postUserDetail,
  postHeadingStyle,
  postSubHeadingStyle,
  showLabel,
  labelType,
  labelViewStyle,
  labelTextStyle,
  modalStyle,
  modalTextStyle,
  modalBackdropColor,
  threeDotIcon,
  pinIcon,
  onThreeDotClick,
}: PostUI) => {
  const {isEdited, isPinned, createdAt} = {...postDetail};
  const {imageUrl} = {...postUserDetail};
  const [showActionListModal, setShowActionListModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({x: 0, y: 0});

  // this function gives a default three dot icon to be displayed
  const defaultThreeDotIcon = () => {
    return (
      <Image
        source={require('../../../assets/images/three_dots3x.png')}
        resizeMode={'contain'}
        style={styles.iconSize}
      />
    );
  };

  // this function gives a default pin icon to be displayed
  const defaultPinIcon = () => {
    return (
      <Image
        source={require('../../../assets/images/pin_icon3x.png')}
        resizeMode={'contain'}
        style={styles.iconSize}
      />
    );
  };

  // this function handles the functionality on the click of three dots
  const onThreedotsClick = (event: any) => {
    const {pageX, pageY} = event.nativeEvent;
    setShowActionListModal(true);
    setModalPosition({x: pageX, y: pageY});
    onThreeDotClick && onThreeDotClick();
  };

  // this function closes the post action list modal
  const closePostActionListModal = () => {
    setShowActionListModal(false);
  };

  return (
    <View style={styles.postHeader}>
      {/* author detail section */}
      <View style={styles.alignRow}>
        <AvatarIcon
          avatarUrl={imageUrl}
          postUserDetail={postUserDetail}
          avatarStyle={avatarStyle}
          postDetail={postDetail}
          nameInitialViewStyle={nameInitialViewStyle}
          nameInitialTextStyle={nameInitialTextStyle}
        />

        {/* author details */}
        <View style={{marginLeft: STYLES.$MARGINS.SMALL}}>
          {/* author heading */}
          <View style={styles.alignRow}>
            <Text style={[styles.postAuthorName, postHeadingStyle]}>
              {postUserDetail.name}
            </Text>
            {showLabel && (
              <View style={[styles.labelView, labelViewStyle]}>
                <Text style={[styles.labelText, labelTextStyle]}>
                  {labelType}
                </Text>
              </View>
            )}
          </View>

          {/* author subHeading */}
          <View style={styles.alignRow}>
            <Text style={[styles.postedDetail, postSubHeadingStyle]}>
              {timeStamp(createdAt)} ago
            </Text>
            {isEdited && (
              <>
                <Image
                  source={require('../../../assets/images/single_dot3x.png')}
                  resizeMode={'contain'}
                  style={styles.dotImageSize}
                />
                <Text style={[styles.postedDetail, postSubHeadingStyle]}>
                  Edited
                </Text>
              </>
            )}
          </View>
        </View>
      </View>

      {/* Top right action buttons */}
      <View
        style={[
          styles.topRightView,
          isPinned && {justifyContent: 'space-between'},
        ]}>
        {isPinned && (
          <LMIcon displayIcon={pinIcon ? pinIcon : defaultPinIcon} />
        )}
        <LMIcon
          displayIcon={threeDotIcon ? threeDotIcon : defaultThreeDotIcon}
          onIconPress={onThreedotsClick}
        />
      </View>

      {/* posts action list modal that is displayed on the click of three dots */}
      <PostActionListModal
        position={modalPosition}
        visible={showActionListModal}
        closeModal={closePostActionListModal}
        modalStyle={modalStyle}
        modalTextStyle={modalTextStyle}
        modalBackdropColor={modalBackdropColor}
        postDetail={postDetail}
        postUserDetail={postUserDetail}
      />
    </View>
  );
};

export default PostHeader;
