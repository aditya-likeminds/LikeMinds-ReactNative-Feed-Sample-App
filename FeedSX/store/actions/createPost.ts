import {Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  DECODE_URL_SUCCESS,
  DECODE_URL_DATA,
  DECODE_URL_FAILED,
} from '../types/types';
import {CALL_API} from '../apiMiddleware';
import {lmFeedClient} from '../../..';

// get decoded url data api action
export const getDecodedUrl = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: DECODE_URL_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient.decodeURL(payload),
        body: payload,
        types: [DECODE_URL_DATA, DECODE_URL_SUCCESS, DECODE_URL_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
