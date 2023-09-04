import {Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {CALL_API} from '../apiMiddleware';
import {
  UNIVERSAL_FEED_DATA,
  UNIVERSAL_FEED_FAILED,
  UNIVERSAL_FEED_SUCCESS,
  INITIATE_API,
  INITIATE_API_FAILED,
  INITIATE_API_SUCCESS,
  MEMBER_STATE_DATA,
  MEMBER_STATE_FAILED,
  MEMBER_STATE_SUCCESS
} from '../types/types';
import { lmFeedClient } from '../../..';
import { InitiateUserRequest } from 'likeminds-sdk';

// initiateUser API action
export const initiateUser = (payload?: any) => async (dispatch: Dispatch) => {
  const { userUniqueId,userName, isGuest} = payload
  try {
    const initiateUserRequest = InitiateUserRequest.builder().setUUID(userUniqueId).setIsGuest(isGuest).setUserName(userName).build()
    return await dispatch({
      type: INITIATE_API_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.initiateUser(initiateUserRequest),
        body: initiateUserRequest,
        types: [INITIATE_API, INITIATE_API_SUCCESS, INITIATE_API_FAILED],
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
      type: MEMBER_STATE_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getMemberState(),
        body: payload,
        types: [MEMBER_STATE_DATA, MEMBER_STATE_SUCCESS, MEMBER_STATE_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// get universal feed API action
export const getFeed = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: UNIVERSAL_FEED_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getFeed(payload),
        body: payload,
        types: [UNIVERSAL_FEED_DATA, UNIVERSAL_FEED_SUCCESS, UNIVERSAL_FEED_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
