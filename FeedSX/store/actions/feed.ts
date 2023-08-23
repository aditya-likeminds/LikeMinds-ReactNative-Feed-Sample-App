import {Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {CALL_API} from '../apiMiddleware';
import {
  FEED_DATA,
  FEED_DATA_FAILED,
  FEED_DATA_SUCCESS,
  INIT_API,
  INIT_API_FAILED,
  INIT_API_SUCCESS,
  PROFILE_DATA,
  PROFILE_DATA_FAILED,
  PROFILE_DATA_SUCCESS
} from '../types/types';
import { lmFeedClient } from '../../..';
import { InitiateUserRequest } from 'likeminds-sdk';

// initiateUser API action
export const initAPI = (payload?: any) => async (dispatch: Dispatch) => {
  const { userUniqueId,userName, isGuest} = payload
  try {
    const params = InitiateUserRequest.builder().setUUID(userUniqueId).setIsGuest(isGuest).setUserName(userName).build()
    return await dispatch({
      type: INIT_API_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.initiateUser(params),
        body: params,
        types: [INIT_API, INIT_API_SUCCESS, INIT_API_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// get memberState API action
export const getMemberState = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: PROFILE_DATA_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getMemberState(),
        body: payload,
        types: [PROFILE_DATA, PROFILE_DATA_SUCCESS, PROFILE_DATA_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// get universal feed API action
export const getAllFeed = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: FEED_DATA_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getFeed(payload),
        body: payload,
        types: [FEED_DATA, FEED_DATA_SUCCESS, FEED_DATA_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
