import {timeStamp} from './timeStamp';
import {nameInitials} from './nameInitials';
import {requestStoragePermission} from './permissions';
import {postShare} from './postShare';
import {getAWS} from './AWSConfig';
import {uploadFilesToAWS} from './uploadFilesToAWS';
import {selectDoc, selectImageVideo} from './mediaSelection';
import { detectURLs } from './detectLinks';

export {
  timeStamp,
  nameInitials,
  requestStoragePermission,
  postShare,
  getAWS,
  uploadFilesToAWS,
  selectDoc,
  selectImageVideo,
  detectURLs
};
