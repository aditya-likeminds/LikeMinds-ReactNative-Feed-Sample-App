import {
  CLEAR_CHATROOM_DETAILS,
  GET_CHATROOM_SUCCESS,
  GET_CONVERSATIONS_SUCCESS,
  PAGINATED_CONVERSATIONS_SUCCESS,
  SET_POSITION,
} from '../types/types';

const initialState = {
  posts: [],
  postDetails: {} as any,
};

export function feedReducer(state = initialState, action: any) {
  switch (action.type) {
    // case GET_CONVERSATIONS_SUCCESS: {
    //   const {conversations = []} = action.body;
    //   let arr = conversations.reverse();
    //   return {...state, conversations: arr};
    // }
    // case PAGINATED_CONVERSATIONS_SUCCESS: {
    //   const {conversations = []} = action.body;
    //   let arr = conversations.reverse();
    //   return {...state, conversations: [...state.conversations, ...arr]};
    // }
    // case GET_CHATROOM_SUCCESS: {
    //   const chatroomDetails = action.body;
    //   return {...state, chatroomDetails: chatroomDetails};
    // }
    // case CLEAR_CHATROOM_DETAILS: {
    //   const {chatroomDetails} = action.body;
    //   return {...state, chatroomDetails: chatroomDetails};
    // }
    // case SET_POSITION: {
    //   const {pageX, pageY} = action.body;
    //   return {...state, position: {x: pageX, y: pageY}};
    // }
    default:
      return state;
  }
}
