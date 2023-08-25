import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {PostUI} from '../../../Models/PostModel';
import STYLES from '../../../constants/Styles';
import {
  IMAGE_ATTACHMENT_TYPE,
  VIDEO_ATTACHMENT_TYPE,
} from '../../../constants/Strings';

const CarouselPost = ({
  carauselActiveItemColor,
  carauselInActiveItemColor,
  carouselPaginationStyle,
  postAttachments,
}: PostUI) => {

  // filtering out the attachments which contains images and videos
  const carouselData = postAttachments?.filter(
    item =>
      item?.attachmentType === IMAGE_ATTACHMENT_TYPE ||
      item?.attachmentType === VIDEO_ATTACHMENT_TYPE,
  );

  return (
    <View style={styles.postMedia}>
      <SwiperFlatList
        data={carouselData}
        showPagination
        style={styles.swiperView}
        paginationStyle={styles.paginationView}
        // handling custom style of active pagination item
        paginationStyleItemActive={
          carouselPaginationStyle
            ? carouselPaginationStyle
            : styles.paginationItemStyle
        }
        // handling custom style of inactive pagination item
        paginationStyleItemInactive={
          carouselPaginationStyle
            ? carouselPaginationStyle
            : styles.paginationItemStyle
        }
        // handle custom color of active pagination item
        paginationActiveColor={
          carauselActiveItemColor
            ? carauselActiveItemColor
            : STYLES.$COLORS.carouselActiveItem
        }
        // handle custom color of inactive pagination item
        paginationDefaultColor={
          carauselInActiveItemColor
            ? carauselInActiveItemColor
            : STYLES.$COLORS.carouselInActiveItem
        }
        renderItem={({item}) => (
          <>
            {/* this section render image */}
            {item?.attachmentType === IMAGE_ATTACHMENT_TYPE && (
              <Image
                source={{uri: item?.attachmentMeta?.url}}
                resizeMode={'contain'}
                style={styles.mediaDimensions}
              />
            )}
            {/* this section render video */}
            {item?.attachmentType === VIDEO_ATTACHMENT_TYPE && (
              <View style={styles.mediaDimensions}></View>
            )}
          </>
        )}
      />
    </View>
  );
};

export default CarouselPost;
