import {Image, Text, View} from 'react-native';
import React from 'react';
import {AvatarUI} from '../../Models/AvatarModel';
import styles from './styles';
import { PostUI } from '../../Models/PostModel';

type Props = AvatarUI & PostUI
const AvatarIcon: React.FC<Props> = props =>  {
  const {avatarStyle, nameInitialViewStyle, nameInitialTextStyle} = props as AvatarUI;
  const {postUserDetail} = props as PostUI;

  const {imageUrl, name} ={...postUserDetail}

  // this function gives the initial characters of a text 
  const getNameInitials = (name: string) => {
    var names = name.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

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
          <Text style={[styles.nameInitialText, nameInitialTextStyle]}>{getNameInitials(name)}</Text>
        </View>
      )}
    </>
  );
};

export default AvatarIcon;
