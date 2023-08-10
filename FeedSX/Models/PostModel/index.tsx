import { TextStyle } from "react-native";

export interface PostStateProps {
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
export interface PostCallbacks {
    likeIcon?: () => React.ReactNode;
    commentIcon?: () => React.ReactNode;
    shareIcon?: () => React.ReactNode;
    bookMarkIcon?: () => React.ReactNode;
    onLikeButtonClick?: () => void;
    onCommentButtonClick?: () => void;
    onShareButtonClick?: () => void;
    onBookmarkButtonClick?: () => void;
}

export declare type PostUI = PostStateProps & PostCallbacks;

  