import {DECODE_URL_SUCCESS} from '../types/types';

const initialState = {
 ogTags: {}
};

export function createPostReducer(state = initialState, action: any) {
  switch (action.type) {
    case DECODE_URL_SUCCESS: {
      const {og_tags={}} = action.body;    
      return {...state, ogTags:og_tags};
    }
    default:
      return state;
  }
}