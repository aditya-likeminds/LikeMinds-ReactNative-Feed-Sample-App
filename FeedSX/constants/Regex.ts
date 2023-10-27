// regex for detecting links while creating post
export const DETECT_LINK_REGEX = /^(https?:\/\/)?(([\w\d]+([.-][\w\d]+)*\.[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(?::\d+)?)((\/[-a-z\d%_.~+]*)*|(\?[;&a-z\d%_.~+=-]*)*)?(\#[-a-z\d_]*)?$/i;


// export const DETECT_LINK_REGEX = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
// '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
// '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
// '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
// '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
// '(\\#[-a-z\\d_]*)?$','i')
