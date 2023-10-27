import { DETECT_LINK_REGEX } from "../constants/Regex";

// this function detects the links in a text and return an array of links
export function detectURLs(text: string) {
  let mySplitArrayText = text.split(" ");

    let linksArray: any = []
    var urlRegex = DETECT_LINK_REGEX;
    
   mySplitArrayText?.map(foundUrl => {if(!! urlRegex.test(foundUrl)){linksArray.push(foundUrl);}})

    // text.replace(urlRegex, function(url: string): any {
    //   linksArray.push(url);
    //   })
      if(linksArray.length >0) {
        return linksArray
      }
}