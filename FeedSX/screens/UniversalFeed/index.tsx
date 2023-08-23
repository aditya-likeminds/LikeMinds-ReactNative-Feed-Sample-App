import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, ScrollView, Image, FlatList} from 'react-native';
import {LMPost} from '../../components';
import {PostStateProps} from '../../Models/PostModel';
import Layout from '../../constants/Layout';
import {lmFeedClient} from '../../..';
import {GetFeedRequest, InitiateUserRequest} from 'likeminds-sdk';
import {useDispatch} from 'react-redux';
import {getAllFeed, getMemberState, initAPI} from '../../store/actions/feed';
import {navigationRef} from '../../navigation/RootNavigation';
import {useAppSelector} from '../../store/store';

const UniversalFeed = () => {
  const dispatch = useDispatch();
  const feedData = useAppSelector(state => state.feed.feed);
  const [communityId, setCommunityId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  // this function calls initiate user API and sets the access token and community id
  async function fetchData() {
    //this line of code is for the sample app only, pass your userUniqueID instead of this.
    // const UUID = await AsyncStorage.getItem('userUniqueID');
    const UUID = '10003';

    let payload = {
      userUniqueId: UUID, // user unique ID
      userName: 'abc', // user name
      isGuest: false,
    };
    // calling initiateUser API
    let res = await dispatch(initAPI(payload) as any);
    if (!!res) {
      // calling getMemberState API
      await dispatch(getMemberState() as any);
      setCommunityId(res?.community?.id);
      setAccessToken(res?.accessToken);
    }
    return res;
  }

  // this functions gets universal feed data
  async function fetchFeed() {
    let payload = {
      page: 1,
      pageSize: 10,
    };
    // calling getFeed API
    let res = await dispatch(
      getAllFeed(
        GetFeedRequest.builder()
          .setpage(payload.page)
          .setpageSize(payload.pageSize)
          .build(),
      ) as any,
    );
    return res;
  }

  useLayoutEffect(() => {
    fetchData();
    fetchFeed();
  }, [navigationRef, lmFeedClient]);

  // readonly props consumed by UI component
  const props: PostStateProps = {
    showBookMarkIcon: true,
    showShareIcon: true,
    likedState: false,
    savedState: true,
    likePlaceholder: 'Like',
    likeCount: 10,
    commentPlaceholder: 'Comment',
    noCommentPlaceholder: 'Add Comment',
    commentCount: 0,
    footerTextStyle: {},
    authorName: 'Theresa Webb',
    postedTime: '2h',
    showEdited: true,
    showLabel: true,
    labelType: 'Admin',
    showPin: false,
    mediaUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhNhTcdpoN6c-rzLj336_o2WpgLgeqirPchSSBerB&s',
    postText: `Here is a list of social media tools to help you get started with your marketing initiatives.`,
  };

  return (
    <>
      <FlatList
        data={feedData}
        renderItem={({item}) => (
          <LMPost
            {...props}
            postAttachments={item.attachments}
            likedState={item.isLiked}
            savedState={item.isSaved}
          />
        )}
      />
    </>
  );
};

export default UniversalFeed;
