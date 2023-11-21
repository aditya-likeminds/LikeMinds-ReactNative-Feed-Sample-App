import {View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';
import {GetPostLikesRequest} from '@likeminds.community/feed-js';
import {postLikes} from '../../store/actions/postLikes';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/store';
import {
  LMHeader,
  LMMemberListItem,
} from '../../../LikeMinds-ReactNative-Feed-UI';
import {NavigationService} from '../../navigation';
import {UNIVERSAL_FEED} from '../../constants/screenNames';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';

const LikesList = (props: any) => {
  const dispatch = useDispatch();
  const {postLike, totalLikes, user} = useAppSelector(state => state.postLikes);

  // this function calls the post likes api
  async function postLikesList(id: string) {
    const payload = {
      postId: id,
    };
    // calling post likes api
    const postLikesResponse = await dispatch(
      postLikes(
        GetPostLikesRequest.builder()
          .setpostId(payload.postId)
          .setpage(1)
          .setpageSize(10)
          .build(),
      ) as any,
    );
    return postLikesResponse;
  }

  // this calls the post likes list function to render the data
  useEffect(() => {
    postLikesList(props.route.params);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <LMHeader
        showBackArrow
        heading="Likes"
        subHeading={
          totalLikes > 1 ? `${totalLikes} likes` : `${totalLikes} like`
        }
        onBackPress={() => NavigationService.navigate(UNIVERSAL_FEED)}
      />
      {/* post likes list */}
      {postLike?.length > 0 ? (
        <FlashList
          data={postLike}
          renderItem={({item}: {item: LMLikeUI}) => {
            return <LMMemberListItem likes={item} />;
          }}
          estimatedItemSize={100}
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
    </SafeAreaView>
  );
};

export default LikesList;
