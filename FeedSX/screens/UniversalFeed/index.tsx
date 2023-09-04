import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {LMLoader, LMPost} from '../../components';
import {PostStateProps} from '../../Models/PostModel';
import {lmFeedClient} from '../../..';
import {GetFeedRequest, LikePostRequest, SavePostRequest} from 'likeminds-sdk';
import {useDispatch} from 'react-redux';
import {
  getFeed,
  getMemberState,
  initiateUser,
  likePost,
  likePostStateHandler,
  savePost,
  savePostStateHandler,
} from '../../store/actions/feed';
import {navigationRef} from '../../navigation/RootNavigation';
import {useAppSelector} from '../../store/store';
import {FlashList} from '@shopify/flash-list';
import { styles } from './styles';

const UniversalFeed = () => {
  const dispatch = useDispatch();
  const feedData = useAppSelector(state => state.feed.feed);
  const userData = useAppSelector(state => state.feed.users);
  const showLoader = useAppSelector(state => state.loader.count);
  const [feedPageNumber, setFeedPageNumber] = useState(1);
  const [communityId, setCommunityId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  // this function calls initiate user API and sets the access token and community id
  async function getInitialData() {
    //this line of code is for the sample app only, pass your userUniqueID instead of this.
    // const UUID = await AsyncStorage.getItem('userUniqueID');
        const UUID = '10003';

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
      pageSize: 10,
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

  // todo: dummy data
  // readonly props consumed by UI component
  const props: PostStateProps = {
    showBookMarkIcon: true,
    showShareIcon: true,
    footerTextStyle: {},
    showLabel: true,
    labelType: 'Admin',
  };

  useEffect(() => {
    if (accessToken) {
      fetchFeed();
    }
  }, [accessToken, feedPageNumber]);

  return (
    <View style={{height: '100%'}}>
      {/* posts list section */}
      {feedData?.length > 0 ? (
        <FlashList
          data={feedData}
          renderItem={({item}: any) => (
            <LMPost
              {...props}
              postDetail={item}
              postUserDetail={userData[item?.userId]}
              onLikeButtonClick={() => postLikeHandler(item?.Id)}
              onBookmarkButtonClick={() => savePostHandler(item?.Id)}
            />
          )}
          estimatedItemSize={200}
          onEndReached={() => {
            setFeedPageNumber(feedPageNumber + 1);
          }}
          ListFooterComponent={() => {
            return <>{showLoader > 0 && <LMLoader />}</>;
          }}
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
      <View
        style={styles.newPostButtonView}>
        <Image
          source={require('../../assets/images/add_post_icon3x.png')}
          resizeMode={'contain'}
          style={{width: 30, height: 30}}
        />
        <Text
          style={styles.newPostText}>
          NEW POST
        </Text>
      </View>
    </View>
  );
};

export default UniversalFeed;
