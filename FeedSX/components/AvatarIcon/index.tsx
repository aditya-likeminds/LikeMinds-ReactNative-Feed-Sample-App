import { Image } from 'react-native';
import React from 'react';
import STYLES from '../../constants/Styles';
import { AvatarUI } from '../../Models/AvatarModel';

const AvatarIcon = ({avatarUrl, avatarStyle}: AvatarUI) => {
  return (
    <Image source={avatarUrl ? {uri: avatarUrl}: require('../../assets/images/default_pic.png')} resizeMode={'contain'}
     style={[{
        width: STYLES.$AVATAR.WIDTH,
        height: STYLES.$AVATAR.HEIGHT,
        borderRadius: STYLES.$AVATAR.BORDER_RADIUS
    }, avatarStyle]} />
  )
}

export default AvatarIcon