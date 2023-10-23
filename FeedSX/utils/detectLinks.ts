import { DETECT_LINK_REGEX } from "../constants/regex";

// this function detects the links in a text and return an array of links
export function detectURLs(text: string) {
    let linksArray: any = []
    var urlRegex = DETECT_LINK_REGEX;
    text.replace(urlRegex, function(url: string): any {
        linksArray.push(url);
      })
      if(linksArray.length >0) {
        return linksArray
      }
}