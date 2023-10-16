import { convertToLMUserUI } from '../../viewDataModels';
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
      let postLikesData = action?.body?.likes;
      let userData = action?.body?.users;
      // converts LMResponse to LMPostUI model
      postLikesData.map((item: any) => {
        item.user = convertToLMUserUI(userData[item.userId])
      });
      return {...state, postLike: postLikesData, totalLikes: totalCount, user: users};
    }
    default:
      return state;
  }
}
