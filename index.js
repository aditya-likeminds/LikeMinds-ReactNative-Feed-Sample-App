/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './FeedSX/App';
import {LMFeedClient} from '@likeminds.community/feed-js';

export const lmFeedClient = LMFeedClient.Builder()
  .setApiKey('')
  .setPlatformCode('rn')
  .setVersionCode(9999)
  .build();

AppRegistry.registerComponent(appName, () => App);
