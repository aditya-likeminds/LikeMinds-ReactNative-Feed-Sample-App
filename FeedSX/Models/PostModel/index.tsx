import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export interface PostStateProps {
  // post footer props
  showBookMarkIcon?: boolean;
  showShareIcon?: boolean;
  likePlaceholder?: string;
  commentPlaceholder?: string;
  noCommentPlaceholder?: string;
  footerTextStyle?: TextStyle;

  // post header props
  avatarStyle?: ImageStyle;
  nameInitialViewStyle?: ViewStyle;
  nameInitialTextStyle?: TextStyle;
  postHeadingStyle?: TextStyle;
  postSubHeadingStyle?: TextStyle;
  showLabel?: boolean;
  labelType?: string;
  labelViewStyle?: ViewStyle;
  labelTextStyle?: TextStyle;
  modalStyle?: ViewStyle;
  modalTextStyle?: TextStyle;
  modalBackdropColor?: string;

  // post media style props
  postTextStyle?: TextStyle;
  carouselPaginationStyle?: ViewStyle;
  carauselActiveItemColor?: string;
  carauselInActiveItemColor?: string;
}

export interface PostMediaProps {
  postDetail: {
    Id: string;
    attachments: [
      {
        attachmentMeta: {
          duration: number;
          name: string;
          ogTags: {
            description: string;
            image: string;
            title: string;
            url: string;
          };
          size: number;
          url: string;
        };
        attachmentType: number;
      },
    ];
    commentsCount: number;
    communityId: string;
    createdAt: number;
    heading: string;
    isEdited: boolean;
    isLiked: boolean;
    isPinned: boolean;
    isSaved: boolean;
    likesCount: number;
    menuItems: [{id: number; title: string}];
    tempId: null;
    text: string;
    topics: null;
    updatedAt: number;
    userId: string;
    uuid: string;
  };
  postUserDetail: {
    customTitle: string;
    id: number;
    imageUrl: string;
    isDeleted: boolean;
    isGuest: boolean;
    name: string;
    questionAnswers: null;
    sdkClientInfo: {
      community: number;
      user: number;
      userUniqueId: string;
      uuid: string;
    };
    userUniqueId: string;
    uuid: string;
  };
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

export declare type PostUI = PostStateProps & PostCallbacks & PostMediaProps;
