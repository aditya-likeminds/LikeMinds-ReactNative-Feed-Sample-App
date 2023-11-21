import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {lmFeedClient} from '../../..';
import {
  AddPostRequest,
  GetFeedRequest,
  LikePostRequest,
  PinPostRequest,
  SavePostRequest,
} from '@likeminds.community/feed-js';
import {useDispatch} from 'react-redux';
import {
  autoPlayPostVideo,
  clearFeed,
  getFeed,
  getMemberState,
  initiateUser,
  likePost,
  likePostStateHandler,
  pinPost,
  pinPostStateHandler,
  savePost,
  savePostStateHandler,
} from '../../store/actions/feed';
import {navigationRef} from '../../navigation/RootNavigation';
import {useAppSelector} from '../../store/store';
import {FlashList} from '@shopify/flash-list';
import {styles} from './styles';
import {
  LMHeader,
  LMIcon,
  LMImage,
  LMPost,
  LMVideo,
} from '../../../LikeMinds-ReactNative-Feed-UI';
import {NavigationService} from '../../navigation';
import {
  APP_TITLE,
  CREATE_POST_PERMISSION,
  DELETE_POST_MENU_ITEM,
  DOCUMENT_ATTACHMENT_TYPE,
  IMAGE_ATTACHMENT_TYPE,
  PIN_POST_MENU_ITEM,
  POST_PIN_SUCCESS,
  POST_SAVED_SUCCESS,
  POST_TYPE,
  POST_UNPIN_SUCCESS,
  POST_UNSAVED_SUCCESS,
  POST_UPLOADED,
  POST_UPLOADING,
  POST_UPLOAD_INPROGRESS,
  REPORT_POST_MENU_ITEM,
  UNPIN_POST_MENU_ITEM,
  VIDEO_ATTACHMENT_TYPE,
} from '../../constants/Strings';
import {DeleteModal, ReportModal} from '../../customModals';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';
import {postLikesClear} from '../../store/actions/postLikes';
import {setUploadAttachments, addPost} from '../../store/actions/createPost';
import {CREATE_POST, LIKES_LIST} from '../../constants/screenNames';
import {uploadFilesToAWS} from '../../utils';
import STYLES from '../../constants/Styles';
import {showToastMessage} from '../../store/actions/toast';

const UniversalFeed = () => {
  const dispatch = useDispatch();
  const feedData = useAppSelector(state => state.feed.feed);
  const {mediaAttachmemnts, linkAttachments, postContent} = useAppSelector(
    state => state.createPost,
  );
  const showLoader = useAppSelector(state => state.loader.count);
  const [feedPageNumber, setFeedPageNumber] = useState(1);
  const [communityId, setCommunityId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [modalPosition, setModalPosition] = useState({x: 0, y: 0});
  const [showActionListModal, setShowActionListModal] = useState(false);
  const [selectedMenuItemPostId, setSelectedMenuItemPostId] = useState('');
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const memberData = useAppSelector(state => state.feed.member);
  const memberRight = useAppSelector(state => state.feed.memberRights);
  const [postUploading, setPostUploading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(true);
  const uploadingMediaAttachmentType = mediaAttachmemnts[0]?.attachmentType;
  const uploadingMediaAttachment = mediaAttachmemnts[0]?.attachmentMeta.url;

  // this function calls initiate user API and sets the access token and community id
  async function getInitialData() {
    //this line of code is for the sample app only, pass your userUniqueID instead of this.
    // todo: remove static data
    // const UUID = await AsyncStorage.getItem('userUniqueID');
    const UUID = '';

    const payload = {
      userUniqueId: UUID, // user unique ID
      userName: 'abc', // user name
      isGuest: false,
    };
    // calling initiateUser API
    const initiateResponse = await dispatch(initiateUser(payload) as any);
    if (initiateResponse) {
      // calling getMemberState API
      await dispatch(getMemberState() as any);
      setFeedPageNumber(1);
      setCommunityId(initiateResponse?.community?.id);
      setAccessToken(initiateResponse?.accessToken);
    }
    return initiateResponse;
  }

  // this functions gets universal feed data
  async function fetchFeed() {
    const payload = {
      page: feedPageNumber,
      pageSize: 20,
    };
    // calling getFeed API
    const getFeedResponse = await dispatch(
      getFeed(
        GetFeedRequest.builder()
          .setpage(payload.page)
          .setpageSize(payload.pageSize)
          .build(),
      ) as any,
    );
    return getFeedResponse;
  }

  // this useEffect handles the execution of addPost api
  useEffect(() => {
    // this checks if any media is selected to be posted and then executes the addPost api
    if (
      mediaAttachmemnts.length > 0 ||
      linkAttachments.length > 0 ||
      postContent != ''
    ) {
      setPostUploading(true);
      postAdd();
    }
  }, [mediaAttachmemnts, linkAttachments, postContent]);

  // this function adds a new post
  const postAdd = async () => {
    const uploadPromises = mediaAttachmemnts?.map(
      async (item: LMAttachmentUI) => {
        return uploadFilesToAWS(
          item.attachmentMeta,
          memberData.userUniqueId,
        ).then(res => {
          item.attachmentMeta.url = res.Location;
          return item; // Return the updated item
        });
      },
    );
    // Wait for all upload operations to complete
    const updatedAttachments = await Promise.all(uploadPromises);
    const addPostResponse = await dispatch(
      addPost(
        AddPostRequest.builder()
          .setAttachments([...updatedAttachments, ...linkAttachments])
          .setText(postContent)
          .build(),
      ) as any,
    );
    if (addPostResponse) {
      setPostUploading(false);
      dispatch(
        setUploadAttachments({
          allAttachment: [],
          linkData: [],
          conText: '',
        }) as any,
      );
      await dispatch(clearFeed() as any);
      setFeedPageNumber(1);
      if (feedPageNumber === 1) {
        fetchFeed();
      }
      dispatch(
        showToastMessage({
          isToast: true,
          message: POST_UPLOADED,
        }) as any,
      );
    }
    return addPostResponse;
  };

  // this functions hanldes the post like functionality
  async function postLikeHandler(id: string) {
    const payload = {
      postId: id,
    };
    dispatch(likePostStateHandler(payload.postId) as any);
    // calling like post api
    const postLikeResponse = await dispatch(
      likePost(
        LikePostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    if (postLikeResponse) {
    }
    return postLikeResponse;
  }

  // this functions hanldes the post save functionality
  async function savePostHandler(id: string, saved?: boolean) {
    const payload = {
      postId: id,
    };
    dispatch(savePostStateHandler(payload.postId) as any);
    // calling the save post api
    const savePostResponse = await dispatch(
      savePost(
        SavePostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    await dispatch(
      showToastMessage({
        isToast: true,
        message: saved ? POST_UNSAVED_SUCCESS : POST_SAVED_SUCCESS,
      }) as any,
    );
    return savePostResponse;
  }

  useLayoutEffect(() => {
    getInitialData();
  }, [navigationRef, lmFeedClient]);

  // this calls the getFeed api whenever the page number gets changed
  useEffect(() => {
    if (accessToken) {
      // fetch feed
      fetchFeed();
      // handles members right
      if (memberData?.state != 1) {
        const members_right = memberRight?.find((item: any) => item?.state === 9);
        if (members_right?.isSelected === false) {
          setShowCreatePost(false);
        }
      }
    }
  }, [accessToken, feedPageNumber]);

  // this function closes the post action list modal
  const closePostActionListModal = () => {
    setShowActionListModal(false);
  };

  // this function handles the functionality on the pin option
  const handlePinPost = async (id: string, pinned?: boolean) => {
    const payload = {
      postId: id,
    };
    dispatch(pinPostStateHandler(payload.postId) as any);
    const pinPostResponse = await dispatch(
      pinPost(
        PinPostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    if (pinPostResponse) {
      dispatch(
        showToastMessage({
          isToast: true,
          message: pinned ? POST_UNPIN_SUCCESS : POST_PIN_SUCCESS,
        }) as any,
      );
    }
    return pinPostResponse;
  };

  // this function handles the functionality on the report option
  const handleReportPost = async () => {
    setShowReportModal(true);
  };

  // this function handles the functionality on the delete option
  const handleDeletePost = async (visible: boolean) => {
    setDeleteModal(visible);
  };

  // this function returns the id of the item selected from menu list and handles further functionalities accordingly
  const onMenuItemSelect = (
    postId: string,
    itemId?: number,
    pinnedValue?: boolean,
  ) => {
    setSelectedMenuItemPostId(postId);
    if (itemId === PIN_POST_MENU_ITEM || itemId === UNPIN_POST_MENU_ITEM) {
      handlePinPost(postId, pinnedValue);
    }
    if (itemId === REPORT_POST_MENU_ITEM) {
      handleReportPost();
    }
    if (itemId === DELETE_POST_MENU_ITEM) {
      handleDeletePost(true);
    }
  };

  // this function gets the detail pf post whose menu item is clicked
  const getPostDetail = () => {
    const postDetail = feedData.find(
      (item: LMPostUI) => item.id === selectedMenuItemPostId,
    );
    return postDetail;
  };
  return (
    <SafeAreaView style={{height: '100%'}}>
      {/* header */}
      <LMHeader heading={APP_TITLE} />
      {/* post uploading section */}
      {postUploading && (
        <View style={styles.postUploadingView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* post uploading media preview */}
            {uploadingMediaAttachmentType === IMAGE_ATTACHMENT_TYPE && (
              <LMImage
                imageUrl={uploadingMediaAttachment}
                imageStyle={{backgroundColor: '#fff'}}
                boxStyle={styles.uploadingImageVideoBox}
                width={styles.uploadingImageVideoBox.width}
                height={styles.uploadingImageVideoBox.height}
              />
            )}
            {uploadingMediaAttachmentType === VIDEO_ATTACHMENT_TYPE && (
              <LMVideo
                videoUrl={uploadingMediaAttachment}
                videoStyle={{backgroundColor: '#fff'}}
                boxStyle={styles.uploadingImageVideoBox}
                width={styles.uploadingImageVideoBox.width}
                height={styles.uploadingImageVideoBox.height}
                showControls={false}
                boxFit="contain"
              />
            )}
            {uploadingMediaAttachmentType === DOCUMENT_ATTACHMENT_TYPE && (
              <LMIcon
                assetPath={require('../../assets/images/pdf_icon3x.png')}
                type="png"
                iconStyle={{marginRight: 2, resizeMode: 'contain'}}
                height={styles.uploadingPdfIconSize.height}
                width={styles.uploadingPdfIconSize.width}
              />
            )}
            <Text style={{color: '#333333'}}>{POST_UPLOADING}</Text>
          </View>
          {/* progress loader */}
          <LMLoader
            size={
              Platform.OS === 'ios'
                ? STYLES.$LMLoaderSizeiOS
                : STYLES.$LMLoaderSizeAndroid
            }
          />
        </View>
      )}
      {/* posts list section */}
      {feedData?.length > 0 ? (
        <FlashList
          data={feedData}
          renderItem={({item}: {item: LMPostUI}) => (
            <>
              <LMPost
                post={item}
                // header props
                headerProps={{
                  post: item,
                  postMenu: {
                    postId: item?.id,
                    menuItems: item?.menuItems,
                    modalPosition: modalPosition,
                    modalVisible: showActionListModal,
                    onCloseModal: closePostActionListModal,
                    onSelected: (postId, itemId) =>
                      onMenuItemSelect(postId, itemId, item?.isPinned),
                  },
                  onTap: () => {},
                  showMenuIcon: true,
                  showMemberStateLabel: true,
                }}
                // footer props
                footerProps={{
                  isLiked: item?.isLiked,
                  isSaved: item?.isSaved,
                  likesCount: item?.likesCount,
                  commentsCount: item?.commentsCount,
                  showBookMarkIcon: true,
                  showShareIcon: true,
                  likeIconButton: {
                    onTap: () => {
                      postLikeHandler(item?.id);
                    },
                  },
                  saveButton: {
                    onTap: () => {
                      savePostHandler(item?.id, item?.isSaved);
                    },
                  },
                  likeTextButton: {
                    onTap: () => {
                      dispatch(postLikesClear() as any);
                      NavigationService.navigate(LIKES_LIST, item?.id);
                    },
                  },
                }}
                mediaProps={{
                  attachments: item?.attachments ? item.attachments : [],
                  videoProps: {videoUrl: '', showControls: true},
                  carouselProps: {
                    attachments: item?.attachments ? item.attachments : [],
                    videoItem: {videoUrl: '', showControls: true},
                  },
                }}
              />
            </>
          )}
          estimatedItemSize={500}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            setFeedPageNumber(feedPageNumber + 1);
          }}
          ListFooterComponent={() => {
            return <>{showLoader > 0 && <LMLoader />}</>;
          }}
          onViewableItemsChanged={({changed, viewableItems}) => {
            if (changed) {
              if (viewableItems) {
                dispatch(
                  autoPlayPostVideo(viewableItems?.[0]?.item?.id) as any,
                );
              }
            }
          }}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 60}}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <LMLoader />
        </View>
      )}
      {/* create post button section */}
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={feedData.length > 0 ? false : true}
        style={[styles.newPostButtonView, {opacity: showCreatePost ? 1 : 0.8}]}
        // handles post uploading status and member rights to create post
        onPress={() =>
          showCreatePost
            ? postUploading
              ? dispatch(
                showToastMessage({
                  isToast: true,
                  message: POST_UPLOAD_INPROGRESS,
                }) as any,
              )
              : NavigationService.navigate(CREATE_POST)
            : dispatch(
              showToastMessage({
                isToast: true,
                message: CREATE_POST_PERMISSION,
              }) as any,
            )
        }>
        <Image
          source={require('../../assets/images/add_post_icon3x.png')}
          resizeMode={'contain'}
          style={{width: 30, height: 30}}
        />
        <Text style={styles.newPostText}>NEW POST</Text>
      </TouchableOpacity>
      {/* delete post modal */}
      {showDeleteModal && (
        <DeleteModal
          visible={showDeleteModal}
          displayModal={visible => handleDeletePost(visible)}
          deleteType={POST_TYPE}
          postDetail={getPostDetail()}
        />
      )}
      {/* report post modal */}
      {showReportModal && (
        <ReportModal
          visible={showReportModal}
          closeModal={() => setShowReportModal(false)}
          reportType={POST_TYPE}
          postDetail={getPostDetail()}
        />
      )}
    </SafeAreaView>
  );
};

export default UniversalFeed;
