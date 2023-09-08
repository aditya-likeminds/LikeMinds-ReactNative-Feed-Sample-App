import {View, Text, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {PostUI} from '../../../models/postModel';
import styles from './styles';
import {VIDEO_ATTACHMENT_TYPE} from '../../../constants/Strings';
import Video from 'react-native-video';
import {useAppSelector} from '../../../store/store';
import LMLoader from '../../LMLoader';

const VideoPost = ({postDetail}: PostUI) => {
  const {attachments, Id} = {...postDetail};
  const autoPlayPostId = useAppSelector(
    state => state.feed.autoPlayVideoPostId,
  );
  const [loading, setLoading] = useState(true);

  // filtering out the attachment which contains video
  const videoData = attachments?.filter(
    item => item?.attachmentType === VIDEO_ATTACHMENT_TYPE,
  );
  return (
    <View style={styles.postMedia}>
      {/* this renders the loader until the first picture of video is displayed */}
      {loading ? (
        <View
          style={[
            styles.mediaDimensions,
            styles.loaderView
          ]}>
          <LMLoader />
        </View>
      ) : null}
      {/* this renders the video */}
      <Video
        source={{uri: videoData?.[0]?.attachmentMeta.url}}
        key={videoData?.[0]?.attachmentMeta.url}
        onReadyForDisplay={() => setLoading(false)}
        repeat={true}
        resizeMode="contain"
        playWhenInactive={false}
        playInBackground={false}
        style={styles.mediaDimensions}
        paused={autoPlayPostId === Id ? false : true} // handles the auto plau/pause functionality
        muted={autoPlayPostId === Id ? false : true}
      />
    </View>
  );
};

export default VideoPost;
