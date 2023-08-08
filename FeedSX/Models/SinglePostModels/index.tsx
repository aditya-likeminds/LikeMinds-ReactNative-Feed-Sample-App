import { TextStyle } from "react-native";

  
  export interface SinglePostStateProps {
    showBookMarkIcon?: boolean,
    showShareIcon?: boolean,
    likedState?: boolean,
    savedState?:  boolean,
    likePlaceholder?: string,
    likeCount?: number,
    commentPlaceholder?: string,
    noCommentPlaceholder?: string,
    commentCount?: number,
    footerTextStyle?: TextStyle
  }
  
  // Functions to handle user interactions
  export interface SinglePostCallbacks {
    likeIcon?: () => void;
    commentIcon?: () => void;
    shareIcon?: () => void;
    bookMarkIcon?: () => void;
    likePress?: () => void;
    commentPress?: () => void;
    sharePress?: () => void;
    bookmarkPress?: () => void;
  }
  
  
  export declare type SinglePostProps = SinglePostStateProps &
  SinglePostCallbacks;

  