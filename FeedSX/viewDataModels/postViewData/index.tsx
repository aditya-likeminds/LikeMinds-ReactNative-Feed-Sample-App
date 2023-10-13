export function postViewData(data: any): LMPostUI[] {
  let postData = data?.posts;
  let userData = data?.users;
  return postData.map((item: any) => {
    return {
      id: item.Id,
      attachments: item.attachments,
      commentsCount: item.commentsCount,
      communityId: item.communityId,
      createdAt: item.createdAt,
      heading: item.heading,
      isEdited: item.isEdited,
      isLiked: item.isLiked,
      isPinned: item.isPinned,
      isSaved: item.isSaved,
      likesCount: item.likesCount,
      menuItems: item.menuItems,
      tempId: item.tempId,
      text: item.text,
      updatedAt: item.updatedAt,
      userId: item.userId,
      uuid: item.uuid,
      user: userData[item.userId]
    };
  })
}
