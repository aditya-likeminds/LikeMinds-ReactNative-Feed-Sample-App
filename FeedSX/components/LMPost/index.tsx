import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles';
import { PostProps } from '../../Models/PostModels'
import PostFooter from './PostFooter';

const LMPost = ({
  likeIcon,
  commentIcon,
  shareIcon,
  bookMarkIcon,
  onLikeButtonClick,
  onBookmarkButtonClick,
  onCommentButtonClick,
  onShareButtonClick,
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
}: PostProps) => {

  const[liked, setLiked] = useState(likedState);
  const [saved, setSaved] = useState(savedState);

  // this function handles the functionality on like button
  const handleLikeButton = () => {
    setLiked(!liked);
    onLikeButtonClick && onLikeButtonClick();
  }

  // this function handles the functionality on bookmark button
  const handleBookmarkButton = () => {
    setSaved(!saved)
    onBookmarkButtonClick && onBookmarkButtonClick();
  }

  // this function handles the functionality on comment button
  const handleCommentButton = () => {
    onCommentButtonClick && onCommentButtonClick();
  }

  // this function handles the functionality on share button
  const handleShareButton = () => {
    onShareButtonClick && onShareButtonClick();
  }
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.postHeader}></View>
      <View style={styles.postDescription}></View>
      <View style={styles.postMedia}></View>

      {/* Post bottom section UI */}
      <PostFooter likeIcon={likeIcon}
        commentIcon={commentIcon}
        shareIcon={shareIcon}
        bookMarkIcon={bookMarkIcon}
        onLikeButtonClick={handleLikeButton}
        onBookmarkButtonClick={handleBookmarkButton}
        onCommentButtonClick={handleCommentButton}
        onShareButtonClick={handleShareButton}
        likedState={liked}
        savedState={saved}
        showBookMarkIcon={showBookMarkIcon}
        showShareIcon={showShareIcon}
        likePlaceholder={likePlaceholder}
        likeCount={likeCount}
        commentPlaceholder={commentPlaceholder}
        noCommentPlaceholder={noCommentPlaceholder}
        commentCount={commentCount}
        footerTextStyle={footerTextStyle}
      />
    </View>
  )
}

export default LMPost