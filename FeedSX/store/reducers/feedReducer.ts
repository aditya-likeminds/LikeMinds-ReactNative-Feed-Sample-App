import {
  FEED_DATA_SUCCESS,
  INIT_API_SUCCESS, PROFILE_DATA_SUCCESS,
} from '../types/types';

const initialState = {
  community: {} as any,
  user: {} as any,
  memberRights: [],
  feed: {} as any
};

export function feedReducer(state = initialState, action: any) {
  switch (action.type) {
    case INIT_API_SUCCESS: {
      const {community = {}} = action.body;
      return {...state, community: community};
    }
    case PROFILE_DATA_SUCCESS: {
      const {member = {}, member_rights = []} = action.body;
      return {...state, user: member, memberRights: member_rights};
    }
    case FEED_DATA_SUCCESS: {
      const {posts = {}} = action.body;
      return {...state, feed: posts};
    }
    default:
      return state;
  }
}
