// post attachment types
export const IMAGE_ATTACHMENT_TYPE = 1;
export const VIDEO_ATTACHMENT_TYPE = 2;
export const DOCUMENT_ATTACHMENT_TYPE = 3;
export const LINK_ATTACHMENT_TYPE = 4;

// post menu items id
export const DELETE_POST_MENU_ITEM = 1;
export const PIN_POST_MENU_ITEM = 2;
export const UNPIN_POST_MENU_ITEM = 3;
export const REPORT_POST_MENU_ITEM = 4;
export const EDIT_POST_MENU_ITEM = 5;

// report entity types
export const POST_REPORT_ENTITY_TYPE = 5;
export const COMMENT_REPORT_ENTITY_TYPE = 6;
export const REPLY_REPORT_ENTITY_TYPE = 7;

// post/comment/reply type
export const POST_TYPE = 'post';
export const COMMENT_TYPE = 'comment';
export const REPLY_TYPE = 'reply';

// toast messages
export const REPORTED_SUCCESSFULLY = 'Reported Successfully';
export const SOMETHING_WENT_WRONG = 'Something Went Wrong';
export const REASON_FOR_DELETION_PLACEHOLDER = 'Enter the reason for Reporting this post';

// pin option in menu items
export const PIN_THIS_POST = 'Pin this Post';
export const UNPIN_THIS_POST = 'Unpin this Post';
export const PIN_POST_ID = 2;
export const UNPIN_POST_ID = 3;

// fetch tags type
export const DELETE_TAGS_TYPE = 0
export const REPORT_TAGS_TYPE = 3

// delete and report modal's text message
export const CONFIRM_DELETE = (type:string) => (`Are you sure you want to delete this ${type}. This action cannot be reversed.`)
export const REPORT_INSTRUSTION = (type: string) => (`You would be able to report this ${type} after selecting a problem`)
export const REPORT_PROBLEM = 'Please specify the problem to continue'
export const DELETION_REASON = 'Reason for deletion'
