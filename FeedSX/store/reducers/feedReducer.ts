import {
  UNIVERSAL_FEED_SUCCESS,
  INITIATE_API_SUCCESS, MEMBER_STATE_SUCCESS,
} from '../types/types';

const initialState = {
  community: {},
  user: {},
  memberRights: [],
  feed: {}
};

export function feedReducer(state = initialState, action: any) {
  switch (action.type) {
    case INITIATE_API_SUCCESS: {
      const {community = {}} = action.body;
      return {...state, community: community};
    }
    case MEMBER_STATE_SUCCESS: {
      const {member = {}, member_rights = []} = action.body;
      return {...state, user: member, memberRights: member_rights};
    }
    case UNIVERSAL_FEED_SUCCESS: {
      const {posts = {}} = action.body;
      return {...state, feed: posts};
    }
    default:
      return state;
  }
}
