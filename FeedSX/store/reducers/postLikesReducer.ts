import { LMMemberListItemProps } from '../../../LikeMinds-ReactNative-Feed-UI/src/components/LMMemberListItem/types';
import { convertToLMLikesList, convertToLMUserUI } from '../../viewDataModels';
import {POST_LIKES_CLEAR, POST_LIKES_SUCCESS} from '../types/types';

const initialState = {
  postLike: [],
  totalLikes: 0,
  user: {},
};

export function postLikesReducer(state = initialState, action: any) {
  switch (action.type) {
    case POST_LIKES_SUCCESS: {
      const {likes = {}, totalCount, users = {}} = action.body;
      let postLikesData = action?.body?.likes;
      let userData = action?.body?.users;
      // converts LMResponse to LMPostUI model
      postLikesData.map((item: any) => {
        let userIdOfPost = item.userId;
        item.user = userData[userIdOfPost];
      });
      return {...state, postLike: likes, totalLikes: totalCount, user: users};
    }
    case POST_LIKES_CLEAR: {
      return {...state, postLike: []};
    }
    default:
      return state;
  }
}
