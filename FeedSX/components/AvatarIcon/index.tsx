import {Image, Text, View} from 'react-native';
import React from 'react';
import {AvatarUI} from '../../models/avatarModel';
import styles from './styles';
import { PostUI } from '../../models/postModel';
import { nameInitials } from '../../utils';

type Props = AvatarUI & PostUI
const AvatarIcon: React.FC<Props> = props =>  {
  const {avatarStyle, nameInitialViewStyle, nameInitialTextStyle} = props as AvatarUI;
  const {postUserDetail} = props as PostUI;

  const {imageUrl, name} ={...postUserDetail}

  return (
    <>
      {imageUrl ? (
        // this renders the avatar image
        <Image
          source={{uri: imageUrl}}
          resizeMode={'contain'}
          style={[styles.avatarView,avatarStyle]}
        />
      ) : (
        // this renders the initial characters of the name in avatar view
        <View style={[styles.nameInitialView, nameInitialViewStyle]}>
          <Text style={[styles.nameInitialText, nameInitialTextStyle]}>{nameInitials(name)}</Text>
        </View>
      )}
    </>
  );
};

export default AvatarIcon;
