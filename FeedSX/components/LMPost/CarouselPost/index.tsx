import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { PostUI } from '../../../Models/PostModel';
import STYLES from '../../../constants/Styles';

const CarouselPost = ({
  carauselActiveItemColor,
  carauselInActiveItemColor,
  carouselPaginationStyle
}: PostUI) => {
  const data = [1, 2, 3, 4];

  return (
    <View style={styles.postMedia}>
      <SwiperFlatList
        data={data}
        showPagination
        style={styles.swiperView}
        paginationStyle={styles.paginationView}
        paginationStyleItemActive={carouselPaginationStyle ? carouselPaginationStyle : styles.paginationItemStyle}
        paginationStyleItemInactive={carouselPaginationStyle ? carouselPaginationStyle : styles.paginationItemStyle}
        paginationActiveColor={carauselActiveItemColor ? carauselActiveItemColor : STYLES.$COLORS.carouselActiveItem}
        paginationDefaultColor={carauselInActiveItemColor ? carauselInActiveItemColor : STYLES.$COLORS.carouselInActiveItem}
        renderItem={({item}) => (
          <View>
            <Image
              source={require('../../../assets/images/media.png')}
              resizeMode={'contain'}
              style={styles.mediaDimensions}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CarouselPost;
