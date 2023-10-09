import {Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  POST_LIKES_DATA,
  POST_LIKES_SUCCESS,
  POST_LIKES_FAILED,
} from '../types/types';
import {CALL_API} from '../apiMiddleware';
import {lmFeedClient} from '../../..';

// get post likes api action
export const postLikes = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: POST_LIKES_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getPostLikes(payload),
        body: payload,
        types: [POST_LIKES_DATA, POST_LIKES_SUCCESS, POST_LIKES_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
