import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import AvatarIcon from '../../AvatarIcon';
import STYLES from '../../../constants/Styles';
import LMIcon from '../../LMIcon';
import { PostUI } from '../../../Models/PostModel';
import { PostActionListModal } from '../../../customModals';


const PostHeader = ({
    avatarStyle,
    avatarUrl,
    defaultAvatarImage,
    authorName,
    postedTime,
    postHeadingStyle,
    postSubHeadingStyle,
    showEdited,
    showLabel,
    labelType,
    labelViewStyle,
    labelTextStyle,
    modalStyle,
    modalTextStyle,
    modalBackdropColor,
    showPin,
    threeDotIcon,
    pinIcon,
    onThreeDotClick
  }: PostUI
) => {
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({x:0, y:0});
  const [pinPost, setPinPost] = useState(showPin)
  
  // this function gives a default three dot icon to be displayed
  const defaultThreeDotIcon = () => {
        return (
        <Image source={require('../../../assets/images/three_dots3x.png')} resizeMode={'contain'}  style={styles.iconSize}/>
        )
  }
  
  // this function gives a default pin icon to be displayed
  const defaultPinIcon = () => {
        return (
        <Image source={require('../../../assets/images/pin_icon3x.png')} resizeMode={'contain'}  style={styles.iconSize}/>
        )
  }

  // this function handles the functionality on the click of three dots
  const onThreedotsClick = (event: any) => {
      const {pageX, pageY} = event.nativeEvent;
      setShowModal(true)
      setModalPosition({x:pageX, y:pageY});
      onThreeDotClick && onThreeDotClick()
  }

  // this function closes the post action list modal
  const closePostActionListModal =() => {
    setShowModal(false)
  }

  // this function handles the pin post functionality 
  const handlePinPost = () => {
    setPinPost(!pinPost)
  }
  return (
    <View style={styles.postHeader}>

        {/* author detail section */}
        <View style={styles.alignRow}>
            <AvatarIcon avatarUrl={avatarUrl ? avatarUrl : defaultAvatarImage ? defaultAvatarImage : ''} avatarStyle={avatarStyle} />

            {/* author details */}
            <View style={{ marginLeft: STYLES.$MARGINS.SMALL }}>

                 {/* author heading */}
                <View style={styles.alignRow}>
                    <Text style={[styles.postAuthorName, postHeadingStyle]}>{authorName}</Text>
                   {showLabel && <View style={[styles.labelView, labelViewStyle]}>
                        <Text style={[styles.labelText, labelTextStyle]}>{labelType}</Text>
                    </View>}
                </View>

                {/* author subHeading */}
                <View style={styles.alignRow}>
                    <Text style={[styles.postedDetail, postSubHeadingStyle]}>{postedTime}</Text>
                    {showEdited && <>
                    <Image source={require('../../../assets/images/single_dot3x.png')} resizeMode={'contain'}  style={styles.dotImageSize}/>
                    <Text style={[styles.postedDetail, postSubHeadingStyle]}>Edited</Text>
                    </>}
                </View>
            </View>
        </View>

        {/* Top right action buttons */}
        <View style={[styles.topRightView, pinPost && {justifyContent: 'space-between'}]}>
         {pinPost && <LMIcon displayIcon={pinIcon? pinIcon : defaultPinIcon} />}
          <LMIcon displayIcon={threeDotIcon? threeDotIcon : defaultThreeDotIcon} onIconPress={onThreedotsClick} />
        </View>

        {/* posts action list modal that is displayed on the click of three dots */}
       <PostActionListModal
       position={modalPosition}
       visible={showModal}
       closeModal={closePostActionListModal}
       modalStyle={modalStyle}
       modalTextStyle={modalTextStyle}
       modalBackdropColor={modalBackdropColor}
       handlePin={handlePinPost}/>
    </View>
  )
}

export default PostHeader