import {Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
// import {myClient} from '../../..';
import {CALL_API} from '../apiMiddleware';
import {
  GET_CHATROOM,
  GET_CHATROOM_SUCCESS,
  GET_CHATROOM_FAILED,
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_FAILED,
  GET_CONVERSATIONS_SUCCESS,
} from '../types/types';

// export const getConversations =
//   (payload: any, showLoader: boolean) => async (dispatch: Dispatch) => {
//     try {
//       return await dispatch({
//         type: GET_CONVERSATIONS_SUCCESS,
//         [CALL_API]: {
//           func: myClient?.getConversation(payload),
//           body: payload,
//           types: [
//             GET_CONVERSATIONS,
//             GET_CONVERSATIONS_SUCCESS,
//             GET_CONVERSATIONS_FAILED,
//           ],
//           showLoader: showLoader,
//         },
//       });
//     } catch (error) {
//       Alert.alert(`${error}`)
//     }
//   };

// export const getChatroom = (payload: any) => async (dispatch: Dispatch) => {
//   try {
//     return await dispatch({
//       type: GET_CHATROOM_SUCCESS,
//       [CALL_API]: {
//         func: myClient?.getChatroom(payload),
//         body: payload,
//         types: [GET_CHATROOM, GET_CHATROOM_SUCCESS, GET_CHATROOM_FAILED],
//         showLoader: false,
//       },
//     });
//   } catch (error) {
//     Alert.alert(`${error}`)
//   }
// };
