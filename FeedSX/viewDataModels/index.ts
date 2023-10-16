import {
  Attachment,
  AttachmentMeta,
  GetFeedResponse,
  IMenuItem,
  IOgTag,
  IPost,
  IUser,
} from 'likeminds-sdk';

/**
 * @param data: [GetFeedResponse]
 * @returns list of [LMPostUI]
 */
export function convertUniversalFeedPosts(data: GetFeedResponse): LMPostUI[] {
  let postData = data.posts;
  let userData = data.users;
  return postData.map((item: IPost) => {
    return convertToLMPostUI(item, userData);
  });
}

/**
 * @param post: [IPost]
 * @param user: [Map] of String to User
 * @returns LMPostUI
 */
export function convertToLMPostUI(
  post: IPost,
  user: {[key: string]: LMUserUI},
): LMPostUI {
  const postData: LMPostUI = {
    id: post.Id,
    attachments: post.attachments
      ? convertToLMAttachmentsUI(post.attachments)
      : [],
    commentsCount: post.commentsCount,
    communityId: post.communityId,
    createdAt: post.createdAt,
    isEdited: post.isEdited,
    isLiked: post.isLiked,
    isPinned: post.isPinned,
    isSaved: post.isSaved,
    likesCount: post.likesCount,
    menuItems: convertToLMMenuItemsUI(post.menuItems),
    text: post.text,
    updatedAt: post.updatedAt,
    userId: post.userId,
    uuid: post.uuid,
    user: convertToLMUserUI(user[post.userId]),
  };
  return postData;
}

/**
 * @param data: [Attachment]
 * @returns list of [LMAttachmentUI]
 */
export function convertToLMAttachmentsUI(data: Attachment[]): LMAttachmentUI[] {
  return data.map((item: Attachment) => {
    return {
      attachmentMeta: convertToLMAttachmentMetaUI(item.attachmentMeta),
      attachmentType: item.attachmentType,
    };
  });
}

/**
 * @param data: AttachmentMeta
 * @returns LMAttachmentMetaUI
 */
export function convertToLMAttachmentMetaUI(
  data: AttachmentMeta,
): LMAttachmentMetaUI {
  const attachmentMetaData: LMAttachmentMetaUI = {
    duration: data.duration,
    format: data.format,
    name: data.name,
    ogTags: convertToLMOgTagsUI(data.ogTags),
    pageCount: data.pageCount,
    size: data.size,
    url: data.url,
  };
  return attachmentMetaData;
}

/**
 * @param data: IOgTag
 * @returns LMOGTagsUI
 */
export function convertToLMOgTagsUI(data: IOgTag): LMOGTagsUI {
  const ogTagsData: LMOGTagsUI = {
    title: data.title,
    description: data.description,
    url: data.url,
    image: data.image,
  };
  return ogTagsData;
}

/**
 * @param data: [IMenuItem]
 * @returns [LMMenuItemsUI]
 */
export function convertToLMMenuItemsUI(data: IMenuItem[]): LMMenuItemsUI[] {
  return data.map(item => {
    return {
      title: item.title,
      id: item.id,
    };
  });
}

/**
 * @param data: IUser
 * @returns LMUserUI
 */
export function convertToLMUserUI(data: IUser): LMUserUI {
  const userData: LMUserUI = {
    customTitle: data.customTitle,
    id: data.id,
    imageUrl: data.imageUrl,
    isGuest: data.isGuest,
    name: data.name,
    organisationName: data.organisationName,
    sdkClientInfo: convertToLMSDKClientInfoUI(data),
    updatedAt: data.updatedAt,
    userUniqueId: data.userUniqueId,
    uuid: data.uuid,
  };
  return userData;
}

/**
 * @param data: IUser
 * @returns LMSDKClientInfoUI
 */
export function convertToLMSDKClientInfoUI(data: IUser): LMSDKClientInfoUI {
  const sdkClientInfo = data.sdkClientInfo;
  const sdkClientInfoConverter: LMSDKClientInfoUI = {
    community: sdkClientInfo.community,
    user: sdkClientInfo.user,
    uuid: sdkClientInfo.uuid,
    userUniqueId: sdkClientInfo.userUniqueId,
  };
  return sdkClientInfoConverter;
}
