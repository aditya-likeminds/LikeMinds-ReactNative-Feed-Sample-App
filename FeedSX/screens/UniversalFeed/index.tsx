import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {PostStateProps} from '../../models/postModel';
import {lmFeedClient} from '../../..';
import {
  GetFeedRequest,
  LikePostRequest,
  PinPostRequest,
  SavePostRequest,
} from 'likeminds-sdk';
import {useDispatch} from 'react-redux';
import {
  autoPlayPostVideo,
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
import {LMPost} from '../../../LikeMinds-ReactNative-Feed-UI';
import {NavigationService} from '../../navigation';
import DeleteModal from '../../customModals/deleteModal';
import {
  DELETE_POST_MENU_ITEM,
  PIN_POST_MENU_ITEM,
  POST_TYPE,
  REPORT_POST_MENU_ITEM,
  UNPIN_POST_MENU_ITEM,
} from '../../constants/Strings';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';
import { postLikesClear } from '../../store/actions/postLikes';
import ReportModal from '../../customModals/reportModal';

const UniversalFeed = () => {
  const dispatch = useDispatch();
  const feedData = useAppSelector(state => state.feed.feed);
  const showLoader = useAppSelector(state => state.loader.count);
  const [feedPageNumber, setFeedPageNumber] = useState(1);
  const [communityId, setCommunityId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [modalPosition, setModalPosition] = useState({x: 0, y: 0});
  const [showActionListModal, setShowActionListModal] = useState(false);
  const [selectedMenuItemPostId, setSelectedMenuItemPostId] = useState('');
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // this function calls initiate user API and sets the access token and community id
  async function getInitialData() {
    //this line of code is for the sample app only, pass your userUniqueID instead of this.
    // todo: remove static data
    // const UUID = await AsyncStorage.getItem('userUniqueID');
    const UUID = '0e53748a-969b-44c6-b8fa-a4c8e1eb1208';

    let payload = {
      userUniqueId: UUID, // user unique ID
      userName: 'abc', // user name
      isGuest: false,
    };
    // calling initiateUser API
    let initiateResponse = await dispatch(initiateUser(payload) as any);
    if (!!initiateResponse) {
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
    let payload = {
      page: feedPageNumber,
      pageSize: 30,
    };
    // calling getFeed API
    let getFeedResponse = await dispatch(
      getFeed(
        GetFeedRequest.builder()
          .setpage(payload.page)
          .setpageSize(payload.pageSize)
          .build(),
      ) as any,
    );
    return getFeedResponse;
  }

  // this functions hanldes the post like functionality
  async function postLikeHandler(id: string) {
    let payload = {
      postId: id,
    };
    dispatch(likePostStateHandler(payload.postId) as any);
    // calling like post api
    let postLikeResponse = await dispatch(
      likePost(
        LikePostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    if (postLikeResponse) {
    }
    return postLikeResponse;
  }

  // this functions hanldes the post save functionality
  async function savePostHandler(id: string) {
    let payload = {
      postId: id,
    };
    dispatch(savePostStateHandler(payload.postId) as any);
    // calling the save post api
    let savePostResponse = await dispatch(
      savePost(
        SavePostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    if (savePostResponse) {
    }
    return savePostResponse;
  }

  useLayoutEffect(() => {
    getInitialData();
  }, [navigationRef, lmFeedClient]);

  // this calls the getFeed api whenever the page number gets changed
  useEffect(() => {
    if (accessToken) {
      fetchFeed();
    }
  }, [accessToken, feedPageNumber]);

  // this function closes the post action list modal
  const closePostActionListModal = () => {
    setShowActionListModal(false);
  };

  // this function handles the functionality on the pin option
  const handlePinPost = async (id: string) => {
    let payload = {
      postId: id,
    };
    dispatch(pinPostStateHandler(payload.postId) as any);
    let pinPostResponse = await dispatch(
      pinPost(
        PinPostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
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
  const onMenuItemSelect = (postId: string, itemId?: number) => {
    setSelectedMenuItemPostId(postId);
    if (itemId === PIN_POST_MENU_ITEM || itemId === UNPIN_POST_MENU_ITEM) {
      handlePinPost(postId);
    }
    if (itemId === REPORT_POST_MENU_ITEM) {
      handleReportPost();
    }
    if (itemId === DELETE_POST_MENU_ITEM) {
      handleDeletePost(true);
    }
  };

  const getPostDetail = () => {
    const postDetail = feedData.find(
      (item: any) => item.Id === selectedMenuItemPostId,
    );
    return postDetail;
  };

  return (
    <View style={{height: '100%'}}>
      {/* posts list section */}
      {feedData?.length > 0 ? (
        <FlashList
          data={feedData}
          renderItem={({item}: any) => (
            <LMPost
              post={item}
              // header props
              headerProps={{
                post: item,
                postMenu: {
                  postId: item.Id,
                  menuItems: item.menuItems,
                  modalPosition: modalPosition,
                  modalVisible: showActionListModal,
                  onCloseModal: closePostActionListModal,
                  onSelected: (postId, itemId) =>
                    onMenuItemSelect(postId, itemId),
                },
                onTap: () => {},
                showMenuIcon: true,
                showMemberStateLabel: true,
              }}
              // footer props
              footerProps={{
                isLiked: item.isLiked,
                isSaved: item.isSaved,
                likesCount: item.likesCount,
                commentsCount: item.commentsCount,
                showBookMarkIcon: true,
                showShareIcon: true,
                likeIconButton: {
                  onTap: () => {
                    postLikeHandler(item.Id);
                  },
                },
                saveButton: {
                  onTap: () => {
                    savePostHandler(item.Id);
                  },
                },
                likeTextButton: {
                  onTap: () => {dispatch(postLikesClear() as any); NavigationService.navigate('LikesList', item.id)},
                },
              }}
              mediaProps={{attachments: item.attachments? item.attachments : [], videoProps:{videoUrl:'', showControls: true}, carouselProps:{attachments:item.attachments? item.attachments : [], videoItem:{videoUrl:'', showControls:true}}}}
            />
          )}
          estimatedItemSize={200}
          onEndReached={() => {
            setFeedPageNumber(feedPageNumber + 1);
          }}
          ListFooterComponent={() => {
            return <>{showLoader > 0 && <LMLoader />}</>;
          }}
          onViewableItemsChanged={({changed, viewableItems}) => {
            if (changed) {
              if (viewableItems) {
                dispatch(autoPlayPostVideo(viewableItems[0]?.item.Id) as any);
              }
            }
          }}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 60}}
        />
      ) : (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LMLoader />
        </View>
      )}
      {/* create post button section */}
      <TouchableOpacity style={styles.newPostButtonView} onPress={() => NavigationService.navigate('CreatePost')}>
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
    </View>
  );
};

export default UniversalFeed;
