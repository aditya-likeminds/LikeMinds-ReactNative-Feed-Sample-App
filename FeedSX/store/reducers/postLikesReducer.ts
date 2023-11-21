import {convertToLMLikesList} from '../../viewDataModels';
import {POST_LIKES_CLEAR, POST_LIKES_SUCCESS} from '../types/types';

const initialState = {
  postLike: [] as any,
  totalLikes: 0,
  user: {},
};

export function postLikesReducer(state = initialState, action: any) {
  switch (action.type) {
    case POST_LIKES_SUCCESS: {
      const {likes = {}, totalCount, users = {}} = action.body;
      const postLikesData = convertToLMLikesList(action?.body);
      return {
        ...state,
        postLike: postLikesData,
        totalLikes: totalCount,
        user: users,
      };
    }
    case POST_LIKES_CLEAR: {
      return {...state, postLike: []};
    }
    default:
      return state;
  }
}
