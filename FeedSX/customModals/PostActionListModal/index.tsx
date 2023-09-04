import {
  View,
  Text,
  Modal,
  Pressable,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {commonStyles} from '../commonStyle';
import Layout from '../../constants/Layout';
import {styles} from './styles';
import {PostUI} from '../../Models/PostModel';
import {PIN_POST_MENU_ITEM} from '../../constants/Strings';

interface PostActionListProps {
  position: any;
  visible: boolean;
  closeModal: () => void;
  handlePin: () => void;
}
type Props = PostActionListProps & PostUI;

const PostActionListModal: React.FC<Props> = props => {
  const {position, visible, closeModal, handlePin} = props as PostActionListProps;
  const {modalStyle, modalTextStyle, modalBackdropColor, postMenuItems} = props as PostUI;

  // this function handles the functionality on the pin option
  const handlePinPost = () => {
    handlePin();
  };
  // this function handles the functionalities over different options in the menu list
  const handleMenuList = (val: number) => {
    if (val === PIN_POST_MENU_ITEM) {
      handlePinPost();
    }
    closeModal();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => closeModal()}>
      <Pressable
        style={[commonStyles.modal, {backgroundColor: modalBackdropColor}]}
        onPress={() => closeModal()}>
        {/* Menu list View */}
        <Pressable
          onPress={() => {}}
          style={[
            commonStyles.modalContainer,
            modalStyle,
            {
              top:
                position.y > Layout.window.height / 2
                  ? Platform.OS === 'ios'
                    ? position.y - 150
                    : position.y - 15
                  : position.y - 10,
            },
          ]}>
          {/* Menu List Items */}
          {postMenuItems &&
            postMenuItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleMenuList(item.id)}>
                  <Text style={[styles.listText, modalTextStyle]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default PostActionListModal;
