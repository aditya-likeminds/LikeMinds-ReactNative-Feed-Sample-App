import {Alert, Share, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {PostUI} from '../../models/postModel';
import PostFooter from './postFooter';
import PostHeader from './postHeader';
import PostContent from './postContent';
import CarouselPost from './carouselPost';
import DocumentPost from './documentPost';
import LinkPost from './linkPost';
import {
  DOCUMENT_ATTACHMENT_TYPE,
  IMAGE_ATTACHMENT_TYPE,
  LINK_ATTACHMENT_TYPE,
  VIDEO_ATTACHMENT_TYPE,
} from '../../constants/Strings';
import VideoPost from './videoPost';
import ImagePost from './imagePost';

const LMPost = ({
  likeIcon,
  commentIcon,
  shareIcon,
  bookMarkIcon,
  onLikeButtonClick,
  onBookmarkButtonClick,
  onCommentButtonClick,
  onShareButtonClick,
  showBookMarkIcon,
  showShareIcon,
  likePlaceholder,
  commentPlaceholder,
  noCommentPlaceholder,
  footerTextStyle,

  avatarStyle,
  nameInitialViewStyle,
  nameInitialTextStyle,
  postHeadingStyle,
  postSubHeadingStyle,
  showLabel,
  labelType,
  labelViewStyle,
  labelTextStyle,
  modalStyle,
  modalTextStyle,
  modalBackdropColor,
  pinIcon,
  threeDotIcon,
  onThreeDotClick,

  postTextStyle,
  carauselActiveItemColor,
  carauselInActiveItemColor,
  carouselPaginationStyle,
  postDetail,
  postUserDetail,
}: PostUI) => {
  const {Id, attachments, isLiked, isSaved, text} = {...postDetail};
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);

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

  // this function invoke the share options for sharing the post link
  const onShare = async () => {
    try {
      const result = await Share.share({
        // todo: static data (replace with the deeplink) 
        message: 'www.google.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  // this function handles the functionality on share button
  const handleShareButton = () => {
    onShareButtonClick && onShareButtonClick();
    onShare();
  };

  return (
    <View style={styles.mainContainer}>
      {/* Post header section UI */}
      <PostHeader
        avatarStyle={avatarStyle}
        nameInitialViewStyle={nameInitialViewStyle}
        nameInitialTextStyle={nameInitialTextStyle}
        postDetail={postDetail}
        postUserDetail={postUserDetail}
        postHeadingStyle={postHeadingStyle}
        postSubHeadingStyle={postSubHeadingStyle}
        showLabel={showLabel}
        labelType={labelType}
        labelViewStyle={labelViewStyle}
        labelTextStyle={labelTextStyle}
        modalStyle={modalStyle}
        modalTextStyle={modalTextStyle}
        modalBackdropColor={modalBackdropColor}
        pinIcon={pinIcon}
        threeDotIcon={threeDotIcon}
        onThreeDotClick={onThreeDotClick}
      />

      {/* Post description section */}
      {(text ||
        attachments?.find(item => item?.attachmentType === LINK_ATTACHMENT_TYPE)
          ?.attachmentType === LINK_ATTACHMENT_TYPE) && (
        <PostContent
          postDetail={postDetail}
          postTextStyle={postTextStyle}
          postUserDetail={postUserDetail}
        />
      )}

      {/* Post media section */}
      {/* condition for rendering different types of post UI */}
      {attachments && (
        <View style={{paddingBottom: 10, paddingTop: 15}}>
          {attachments?.length > 1 ? (
            // this section renders if there are multiple attachments
            attachments?.filter(
              item =>
                item?.attachmentType === IMAGE_ATTACHMENT_TYPE ||
                item?.attachmentType === VIDEO_ATTACHMENT_TYPE,
            ).length >= 2 ? (
              // this section renders if the images and videos attachment are more than or eqaul to 2
              <CarouselPost
                postDetail={postDetail}
                carauselActiveItemColor={carauselActiveItemColor}
                carauselInActiveItemColor={carauselInActiveItemColor}
                carouselPaginationStyle={carouselPaginationStyle}
                postUserDetail={postUserDetail}
              />
            ) : (
              // this section renders if there are multiple attachments but the image or video attachments are less than 2
              <>
                {attachments?.find(
                  item => item?.attachmentType === IMAGE_ATTACHMENT_TYPE,
                ) && (
                  <ImagePost
                    postDetail={postDetail}
                    postUserDetail={postUserDetail}
                  />
                )}
                {attachments?.find(
                  item => item?.attachmentType === VIDEO_ATTACHMENT_TYPE,
                ) && (
                  <VideoPost
                    postDetail={postDetail}
                    postUserDetail={postUserDetail}
                  />
                )}
                {attachments?.find(
                  item => item?.attachmentType === DOCUMENT_ATTACHMENT_TYPE,
                ) && (
                  <DocumentPost
                    postDetail={postDetail}
                    postUserDetail={postUserDetail}
                  />
                )}
              </>
            )
          ) : (
            // this section renders if there is a single attachment
            <>
              {attachments
                ? attachments[0]?.attachmentType === IMAGE_ATTACHMENT_TYPE && (
                    <ImagePost
                      postDetail={postDetail}
                      postUserDetail={postUserDetail}
                    />
                  )
                : null}
              {attachments
                ? attachments[0]?.attachmentType === VIDEO_ATTACHMENT_TYPE && (
                    <VideoPost
                      postDetail={postDetail}
                      postUserDetail={postUserDetail}
                    />
                  )
                : null}
              {attachments
                ? attachments[0]?.attachmentType ===
                    DOCUMENT_ATTACHMENT_TYPE && (
                    <DocumentPost
                      postDetail={postDetail}
                      postUserDetail={postUserDetail}
                    />
                  )
                : null}
              {attachments
                ? attachments[0]?.attachmentType === LINK_ATTACHMENT_TYPE && (
                    <LinkPost
                      postDetail={postDetail}
                      postUserDetail={postUserDetail}
                    />
                  )
                : null}
            </>
          )}
        </View>
      )}

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
        postDetail={postDetail}
        postUserDetail={postUserDetail}
        showBookMarkIcon={showBookMarkIcon}
        showShareIcon={showShareIcon}
        likePlaceholder={likePlaceholder}
        commentPlaceholder={commentPlaceholder}
        noCommentPlaceholder={noCommentPlaceholder}
        footerTextStyle={footerTextStyle}
      />
    </View>
  );
};

export default LMPost;
