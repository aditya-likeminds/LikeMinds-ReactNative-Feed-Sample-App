import { LMMemberListItemProps } from '../../../LikeMinds-ReactNative-Feed-UI/src/components/LMMemberListItem/types';
import { convertToLMLikesList, convertToLMUserUI } from '../../viewDataModels';
import {POST_LIKES_SUCCESS} from '../types/types';

const initialState = {
  postLike: [],
  totalLikes: 0,
  user: {},
};

export function postLikesReducer(state = initialState, action: any) {
  switch (action.type) {
    case POST_LIKES_SUCCESS: {
      const {likes = {}, totalCount, users = {}} = action.body;
      let postLikesData = convertToLMLikesList(action.body)
      return {...state, postLike: postLikesData, totalLikes: totalCount, user: users};
    }
    default:
      return state;
  }
}
