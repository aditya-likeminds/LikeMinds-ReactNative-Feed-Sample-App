import {View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {PostUI} from '../../Models/PostModel';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import CarouselPost from './CarouselPost';
import DocumentPost from './DocumentPost';
import LinkPost from './LinkPost';
import { DOCUMENT_ATTACHMENT_TYPE, IMAGE_ATTACHMENT_TYPE, LINK_ATTACHMENT_TYPE, VIDEO_ATTACHMENT_TYPE } from '../../constants/Strings';

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

  postText,
  postTextStyle,
  postAttachments,
  carauselActiveItemColor,
  carauselInActiveItemColor,
  carouselPaginationStyle,
}: PostUI) => {
  const [liked, setLiked] = useState(likedState);
  const [saved, setSaved] = useState(savedState);

  // this function handles the functionality on like button
  const handleLikeButton = () => {
    setLiked(!liked);
    onLikeButtonClick && onLikeButtonClick();
  };

  // this function handles the functionality on bookmark button
  const handleBookmarkButton = () => {
    setSaved(!saved);
    onBookmarkButtonClick && onBookmarkButtonClick();
  };

  // this function handles the functionality on comment button
  const handleCommentButton = () => {
    onCommentButtonClick && onCommentButtonClick();
  };

  // this function handles the functionality on share button
  const handleShareButton = () => {
    onShareButtonClick && onShareButtonClick();
  };

  return (
    <View style={styles.mainContainer}>
      {/* Post header section UI */}
      <PostHeader
        avatarStyle={avatarStyle}
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
        onThreeDotClick={onThreeDotClick}
      />

      {/* Post description section */}
      <PostContent
        postText={postText}
        postTextStyle={postTextStyle}
        postAttachments={postAttachments}
      />

      {/* Post media section */}
      {/* condition for rendering different types of post UI */}
      {postAttachments ? (
        postAttachments?.length > 1 ? (
          // this section renders if there are multiple attachments
          <>
          {/* this renders carousel component if there are multiple images and videos */}
            {postAttachments?.find(
              item => item.attachmentType === IMAGE_ATTACHMENT_TYPE || item.attachmentType === VIDEO_ATTACHMENT_TYPE,
            ) && (
              <CarouselPost
                carauselActiveItemColor={carauselActiveItemColor}
                carauselInActiveItemColor={carauselInActiveItemColor}
                carouselPaginationStyle={carouselPaginationStyle}
                postAttachments={postAttachments}
              />
            )}
            {/* this renders document component with multiple document attachments */}
            {postAttachments?.find(item => item.attachmentType === DOCUMENT_ATTACHMENT_TYPE) && (
              <DocumentPost postAttachments={postAttachments} />
            )}
          </>
        ) : (
          // this section renders if there is a single attachment
          <>
          {/* this renders carousel component if there is a single image or video */}
            {(postAttachments[0]?.attachmentType === IMAGE_ATTACHMENT_TYPE ||
              postAttachments[0]?.attachmentType === VIDEO_ATTACHMENT_TYPE) && (
              <CarouselPost
                carauselActiveItemColor={carauselActiveItemColor}
                carauselInActiveItemColor={carauselInActiveItemColor}
                carouselPaginationStyle={carouselPaginationStyle}
                postAttachments={postAttachments}
              />
            )}
             {/* this renders document component with single document attachment */}
            {postAttachments[0]?.attachmentType === DOCUMENT_ATTACHMENT_TYPE && (
              <DocumentPost postAttachments={postAttachments} />
            )}
            {/* this renders link preview component for single link attachment */}
            {postAttachments[0]?.attachmentType === LINK_ATTACHMENT_TYPE && (
              <LinkPost postAttachments={postAttachments} />
            )}
          </>
        )
      ) : null}

      {/* Post bottom section UI */}
      <PostFooter
        likeIcon={likeIcon}
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
  );
};

export default LMPost;
