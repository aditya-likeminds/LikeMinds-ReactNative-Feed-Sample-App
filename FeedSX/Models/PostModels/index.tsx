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
    likeIcon?: () => void;
    commentIcon?: () => void;
    shareIcon?: () => void;
    bookMarkIcon?: () => void;
    onLikeButtonClick?: () => void;
    onCommentButtonClick?: () => void;
    onShareButtonClick?: () => void;
    onBookmarkButtonClick?: () => void;
}

  export declare type PostProps = PostStateProps & PostCallbacks;

  