import { Image } from 'react-native';
import React from 'react';
import STYLES from '../../constants/Styles';

const AvatarIcon = ({avatarUrl, avatarStyle}: any) => {
  return (
    <Image source={{ uri: avatarUrl }} style={[{
        width: STYLES.$AVATAR.WIDTH,
        height: STYLES.$AVATAR.HEIGHT,
        borderRadius: STYLES.$AVATAR.BORDER_RADIUS
    }, avatarStyle]} />
  )
}

export default AvatarIcon