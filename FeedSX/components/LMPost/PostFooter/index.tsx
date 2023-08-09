import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import LMIcon from '../../LMIcon'
import { BOOKMARKED_ICON, BOOKMARK_ICON, COMMENT_ICON, LIKED_ICON, LIKE_ICON, SHARE_ICON } from '../../../constants/Strings';
import STYLES from '../../../constants/Styles';
import { PostProps } from '../../../Models/PostModels';
import Icon from 'react-native-vector-icons/FontAwesome';

const PostFooter = ({
    likeIcon,
    commentIcon,
    shareIcon,
    bookMarkIcon,
    onLikeButtonClick,
    onBookmarkButtonClick,
    onShareButtonClick,
    onCommentButtonClick,
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
  }: PostProps
) => {
  
  // this function gives a default like icon to be displayed 
  const defaultLikeIcon = () => {
    if (likedState) {
      return <Icon name={LIKED_ICON} size={22} color={STYLES.$COLORS.RED} />
    } else {
      return <Icon name={LIKE_ICON} size={22} color={STYLES.$COLORS.lightTextColor} />
    }
  }

  // this function gives a default comment icon to be displayed
  const defaultCommentIcon = () => {
    return (
    <Icon name={COMMENT_ICON} size={22} color={STYLES.$COLORS.lightTextColor} />
    )
  }

  // this function gives a default bookmark icon to be displayed
  const defaultBookmarkIcon = () => {
    if (savedState) {
      return <Icon name={BOOKMARKED_ICON} size={22} color={STYLES.$COLORS.darkTextColor} />
    } else {
      return <Icon name={BOOKMARK_ICON} size={22} color={STYLES.$COLORS.lightTextColor} />
    }
  }

  // this function gives a default share icon to be displayed
  const defaultShareIcon = () => {
    return (
    <Icon name={SHARE_ICON} size={22} color={STYLES.$COLORS.lightTextColor} />
    )
  }

  return (
    <View style={styles.postFooter}>
      <View style={styles.alignRow}>
        <View style={styles.alignRow}>
          <LMIcon displayIcon={likeIcon ? likeIcon : defaultLikeIcon} onIconPress={onLikeButtonClick} />
          <Text style={[styles.postFooterText, footerTextStyle]}>{likeCount ? likePlaceholder ? `${likeCount} ${likePlaceholder}` : `${likeCount} Like` : likePlaceholder ?`${likePlaceholder}` : 'Like'}</Text>
        </View>
        <View style={[styles.alignRow, { marginLeft: STYLES.$MARGINS.LARGE }]}>
            <LMIcon displayIcon={commentIcon ? commentIcon : defaultCommentIcon} onIconPress={onCommentButtonClick} />
            <Text style={[styles.postFooterText, footerTextStyle]}>{commentCount && commentCount > 0 ? commentPlaceholder ? `${commentCount} ${commentPlaceholder}` : `${commentCount} Comments` : noCommentPlaceholder ? `${noCommentPlaceholder}` : `Add Comment`}</Text>
        </View>
      </View>
        <View style={[styles.alignRow, showBookMarkIcon && showShareIcon && { width: '20%', justifyContent: 'space-between'}]}>
          {showBookMarkIcon && <LMIcon displayIcon={bookMarkIcon ? bookMarkIcon : defaultBookmarkIcon} onIconPress={onBookmarkButtonClick} />}
          {showShareIcon && <LMIcon displayIcon={shareIcon ? shareIcon : defaultShareIcon} onIconPress={onShareButtonClick} />}
        </View>
    </View>
  )
}

export default PostFooter