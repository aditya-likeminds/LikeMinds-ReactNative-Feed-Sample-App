/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './FeedSX/App';
import {LMFeedClient} from 'likeminds-sdk';

export const lmFeedClient = LMFeedClient.Builder()
  .setApiKey('4f881a74-8d0b-4c73-9f60-3d2370216392')
  .setPlatformCode('rn')
  .setVersionCode(9999)
  .build();

AppRegistry.registerComponent(appName, () => App);
