import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles';
import { PostUI } from '../../Models/PostModel'
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import ImagePost from './ImagePost';
import PostContent from './PostContent';
import CarouselPost from './CarouselPost';
import DocumentPost from './DocumentPost';
import VideoPost from './VideoPost';
import LinkPost from './LinkPost';

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
  footerTextStyle,

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
  pinIcon,
  threeDotIcon,
  onThreeDotClick,

  mediaUrl,
  postText,
  postTextStyle,
  attachment_type,
  carauselActiveItemColor,
  carauselInActiveItemColor,
  carouselPaginationStyle
}: PostUI) => {

  const [liked, setLiked] = useState(likedState);
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

      {/* Post header section UI */}
      <PostHeader avatarStyle={avatarStyle}
        avatarUrl={avatarUrl}
        defaultAvatarImage={defaultAvatarImage}
        authorName={authorName}
        postedTime={postedTime}
        postHeadingStyle={postHeadingStyle}
        postSubHeadingStyle={postSubHeadingStyle}
        showEdited={showEdited}
        showLabel={showLabel}
        labelType={labelType}
        labelViewStyle={labelViewStyle}
        labelTextStyle={labelTextStyle}
        modalStyle={modalStyle}
        modalTextStyle={modalTextStyle}
        modalBackdropColor={modalBackdropColor}
        showPin={showPin}
        pinIcon={pinIcon}
        threeDotIcon={threeDotIcon}
        onThreeDotClick={onThreeDotClick} />

      {/* Post description section */}
      <PostContent postText={postText}
        postTextStyle={postTextStyle} />

      {/* Post media section */}
      {attachment_type && attachment_type?.length > 1 ?
      attachment_type.filter((curr) => curr === 1 || curr ===2).length >= 2 ?
      <CarouselPost carauselActiveItemColor={carauselActiveItemColor} carauselInActiveItemColor={carauselInActiveItemColor} carouselPaginationStyle={carouselPaginationStyle} />
      : 
      <>{attachment_type?.find((e) => e===1) && <ImagePost mediaUrl={mediaUrl} />}
      {attachment_type?.find((e) => e===2) && <VideoPost />}
      {attachment_type?.find((e) => e===3) && <DocumentPost />}</>
      :
      <>{attachment_type && attachment_type?.[0] === 1 && <ImagePost mediaUrl={mediaUrl} />}
      {attachment_type && attachment_type?.[0] === 2 && <VideoPost />}
      {attachment_type && attachment_type?.[0] === 3 && <DocumentPost />}
      {attachment_type && attachment_type?.[0] === 4 && <LinkPost />}</>}

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