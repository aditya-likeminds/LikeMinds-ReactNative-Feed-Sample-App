import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {LMPost} from '../../components';
import {PostStateProps} from '../../Models/PostModel';
import Layout from '../../constants/Layout';
import {lmFeedClient} from '../../..';
import {GetFeedRequest, InitiateUserRequest} from 'likeminds-sdk';
import {useDispatch} from 'react-redux';
import {getFeed, getMemberState, initiateUser} from '../../store/actions/feed';
import {navigationRef} from '../../navigation/RootNavigation';
import {useAppSelector} from '../../store/store';
import {FlashList} from '@shopify/flash-list';

const UniversalFeed = () => {
  const dispatch = useDispatch();
  const feedData = useAppSelector(state => state.feed.feed);
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
      setCommunityId(initiateResponse?.community?.id);
      setAccessToken(initiateResponse?.accessToken);
    }
    return initiateResponse;
  }

  // this functions gets universal feed data
  async function fetchFeed() {
    let payload = {
      page: 1,
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

  useLayoutEffect(() => {
    getInitialData();
    fetchFeed();
  }, [navigationRef, lmFeedClient]);

  // todo: dummy data
  // readonly props consumed by UI component
  const props: PostStateProps = {
    showBookMarkIcon: true,
    showShareIcon: true,
    footerTextStyle: {},
    authorName: 'Theresa Webb',
    postedTime: '2h',
    showLabel: true,
    labelType: 'Admin',
  };

  return (
    <>
      <FlashList
        data={feedData}
        renderItem={({item}) => (
          <LMPost
            {...props}
            postAttachments={item.attachments}
            likedState={item.isLiked}
            savedState={item.isSaved}
            likeCount={item.likesCount}
            commentCount={item.commentsCount}
            showEdited={item.isEdited}
            showPin={item.isPinned}
            postText={item.text}
            postMenuItems={item.menuItems}
          />
        )}
        estimatedItemSize={15}
      />
    </>
  );
};

export default UniversalFeed;
