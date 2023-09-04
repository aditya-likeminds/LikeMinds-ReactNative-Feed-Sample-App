import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export interface PostStateProps {
    // post footer props
    showBookMarkIcon?: boolean,
    showShareIcon?: boolean,
    likedState?: boolean,
    savedState?:  boolean,
    likePlaceholder?: string,
    likeCount?: number,
    commentPlaceholder?: string,
    noCommentPlaceholder?: string,
    commentCount?: number,
    footerTextStyle?: TextStyle,

    // post header props
    avatarStyle?: ImageStyle,
    avatarUrl?: string,
    defaultAvatarImage?: string,
    authorName?: string,
    postedTime?: string,
    postHeadingStyle?: TextStyle,
    postSubHeadingStyle?: TextStyle,
    showEdited?: boolean,
    showLabel?:boolean,
    labelType?: string,
    labelViewStyle?: ViewStyle,
    labelTextStyle?: TextStyle,
    modalStyle?: ViewStyle,
    modalTextStyle?: TextStyle,
    modalBackdropColor?: string,
    showPin?: boolean,

    // post media
    // todo: remove these different props and create one single interface for post detail  
    postText?: string,
    postTextStyle?: TextStyle,
    postAttachments?: Array<any>,
    postMenuItems?: Array<any>,
    carouselPaginationStyle?: ViewStyle,
    carauselActiveItemColor?: string,
    carauselInActiveItemColor?: string
}

// Functions to handle user interactions
export interface PostCallbacks {
    //post footer
    likeIcon?: () => React.ReactNode;
    commentIcon?: () => React.ReactNode;
    shareIcon?: () => React.ReactNode;
    bookMarkIcon?: () => React.ReactNode;
    onLikeButtonClick?: () => void;
    onCommentButtonClick?: () => void;
    onShareButtonClick?: () => void;
    onBookmarkButtonClick?: () => void;

    // post header
    pinIcon?: () => React.ReactNode;
    threeDotIcon?: () => React.ReactNode;
    onThreeDotClick?: () => void;
}

export declare type PostUI = PostStateProps & PostCallbacks;

  