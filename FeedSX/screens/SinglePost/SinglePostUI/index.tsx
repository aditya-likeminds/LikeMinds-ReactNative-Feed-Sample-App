import { View, Text } from 'react-native'
import React from 'react'
import { IconComponent } from '../../../components'
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SinglePostProps } from '../../../Models/SinglePostModels'
import { BOOKMARKED_ICON, BOOKMARK_ICON, COMMENT_ICON, LIKED_ICON, LIKE_ICON, SHARE_ICON } from '../../../constants/Strings';
import STYLES from '../../../constants/Styles';

const SinglePostUI = ({
  likeIcon,
  commentIcon,
  shareIcon,
  bookMarkIcon,
  likePress,
  bookmarkPress,
  likedState,
  savedState,
  showBookMarkIcon,
  showShareIcon,
  likePlaceholder,
  likeCount,
  commentPlaceholder,
  noCommentPlaceholder,
  commentCount,
  footerTextStyle
}: SinglePostProps) => {
  const defaultLikeIcon = () => {
      if(likedState) {
        return  <Icon name={LIKED_ICON} size={22} color={STYLES.$COLORS.RED} />
      } else {
        return  <Icon name={LIKE_ICON} size={22} color={STYLES.$COLORS.lightTextColor} />
      }
    
  }
  const defaultCommentIcon = () => {
    return (
      <Icon name={COMMENT_ICON} size={22} color={STYLES.$COLORS.lightTextColor} />
    )
  }
  const defaultBookmarkIcon = () => {
    if(savedState) {
      return  <Icon name={BOOKMARKED_ICON} size={22} color={STYLES.$COLORS.darkTextColor} />
    } else {
      return  <Icon name={BOOKMARK_ICON} size={22} color={STYLES.$COLORS.lightTextColor} />
    }
 
  }
  const defaultShareIcon = () => {
    return (
      <Icon name={SHARE_ICON} size={22} color={STYLES.$COLORS.lightTextColor} />
    )
  }
  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.postHeader}></View>
      <View style={styles.postDescription}></View>
      <View style={styles.postMedia}></View> */}
      <View style={styles.postFooter}>
        <View style={styles.alignRow}>
          <View style={styles.alignRow}>
            <IconComponent displayIcon={likeIcon ? likeIcon : defaultLikeIcon} onIconPress={likePress} />
            <Text style={[styles.postFooterText, footerTextStyle]}>{likeCount ?`${likeCount} ${likePlaceholder}` : `${likePlaceholder}`}</Text>
          </View>
          <View style={[styles.alignRow, {marginLeft: STYLES.$MARGINS.LARGE}]}>
            <IconComponent displayIcon={commentIcon ? commentIcon : defaultCommentIcon} />
            <Text style={[styles.postFooterText, footerTextStyle]}>{commentCount && commentCount > 0 ? commentPlaceholder ? `${commentCount} ${commentPlaceholder}` : `${commentCount} Comments` : noCommentPlaceholder ? `${noCommentPlaceholder}` : `Add Comment`}</Text>
          </View>
        </View>
        <View style={[styles.alignRow, showBookMarkIcon && showShareIcon && {width:'20%', justifyContent:'space-between'}]}>
         {showBookMarkIcon && <IconComponent displayIcon={bookMarkIcon ? bookMarkIcon : defaultBookmarkIcon} onIconPress={bookmarkPress}/>}
          {showShareIcon && <IconComponent displayIcon={shareIcon ? shareIcon :defaultShareIcon} />}
        </View>
      </View>
    </View>
  )
}

export default SinglePostUI