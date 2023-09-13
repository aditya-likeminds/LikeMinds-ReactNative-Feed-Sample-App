import { View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import styles from './styles'
import LMIcon from '../../LMIcon'
import STYLES from '../../../constants/Styles';
import { PostUI } from '../../../models/postModel';

const PostFooter = ({
    likeIcon,
    commentIcon,
    shareIcon,
    bookMarkIcon,
    onLikeButtonClick,
    onBookmarkButtonClick,
    onShareButtonClick,
    onCommentButtonClick,
    showBookMarkIcon,
    showShareIcon,
    likePlaceholder,
    commentPlaceholder,
    noCommentPlaceholder,
    footerTextStyle,
    postDetail
  }: PostUI
) => {
  const {isLiked, likesCount, isSaved, commentsCount} = {...postDetail}

  // this function gives a default like icon to be displayed 
  const defaultLikeIcon = () => {
    if (isLiked) {
      return <Image source={require('../../../assets/images/heart_red_icon3x.png')} resizeMode={'contain'} style={styles.likeIconSize} /> 
    } else {
      return <Image source={require('../../../assets/images/heart_icon3x.png')} resizeMode={'contain'} style={styles.likeIconSize}/>
    }
  }

  // this function gives a default comment icon to be displayed
  const defaultCommentIcon = () => {
    return (
    <Image source={require('../../../assets/images/comment_icon3x.png')} resizeMode={'contain'} style={styles.commentIconSize} />
    )
  }

  // this function gives a default bookmark icon to be displayed
  const defaultBookmarkIcon = () => {
    if (isSaved) {
      return <Image source={require('../../../assets/images/saved_bookmark_icon3x.png')} resizeMode={'contain'}  style={styles.iconSize} />
    } else {
      return <Image source={require('../../../assets/images/bookmark_icon3x.png')} resizeMode={'contain'}  style={styles.iconSize}/>
    }
  }

  // this function gives a default share icon to be displayed
  const defaultShareIcon = () => {
    return (
    <Image source={require('../../../assets/images/share_icon3x.png')} resizeMode={'contain'} style={styles.iconSize}/>
    )
  }

  return (
    <View style={styles.postFooter}>

      {/* like and comment view */}
      <View style={styles.alignRow}>

        {/* like section */}
        <View style={styles.alignRow}>
          <LMIcon displayIcon={likeIcon ? likeIcon : defaultLikeIcon} onIconPress={onLikeButtonClick} />
          <Text style={[styles.postFooterText, footerTextStyle]}>{likesCount ? likePlaceholder ? `${likesCount} ${likePlaceholder}` : likesCount > 1 ? `${likesCount} Likes`: `${likesCount} Like` : likePlaceholder ?`${likePlaceholder}` : 'Like'}</Text>
        </View>

        {/* comment section */}
        <View style={[styles.alignRow, { marginLeft: STYLES.$MARGINS.LARGE }]}>
            <LMIcon displayIcon={commentIcon ? commentIcon : defaultCommentIcon} onIconPress={onCommentButtonClick} />
            <Text style={[styles.postFooterText, footerTextStyle]}>{commentsCount && commentsCount > 0 ? commentPlaceholder ? `${commentsCount} ${commentPlaceholder}` : commentsCount > 1 ? `${commentsCount} Comments` : `${commentsCount} Comment` : noCommentPlaceholder ? `${noCommentPlaceholder}` : `Add Comment`}</Text>
        </View>
      </View>

      {/* save and share view */}
        <View style={[styles.alignRow, showBookMarkIcon && showShareIcon && { width: '20%', justifyContent: 'space-between'}]}>
          
          {/* save section */}
          {showBookMarkIcon && <LMIcon displayIcon={bookMarkIcon ? bookMarkIcon : defaultBookmarkIcon} onIconPress={onBookmarkButtonClick} />}

          {/* share section */}
          {showShareIcon && <LMIcon displayIcon={shareIcon ? shareIcon : defaultShareIcon} onIconPress={onShareButtonClick} />}
        </View>
    </View>
  )
}

export default PostFooter