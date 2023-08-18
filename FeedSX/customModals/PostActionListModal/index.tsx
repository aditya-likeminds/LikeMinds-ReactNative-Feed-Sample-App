import { View, Text, Modal, Pressable, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { commonStyles } from '../commonStyle';
import Layout from '../../constants/Layout';
import { styles } from './styles';
import { PostUI } from '../../Models/PostModel';

interface PostActionListProps {
  position:any,
  visible:boolean,
  closeModal: () => void,
  handlePin: () => void
}
type Props = PostActionListProps & PostUI

const PostActionListModal: React.FC<Props> = props => {
  const{position, visible, closeModal, handlePin} = props as PostActionListProps;
  const{modalStyle, modalTextStyle, modalBackdropColor} = props as PostUI;
  const menuItems = [
    {id : 1, Title: 'Delete'},
    {id : 2, Title: 'Pin'},
    {id : 5, Title: 'Edit'}]

    // this function handles the functionality on the pin option 
    const handlePinPost = () => {
      handlePin()
    }
    // this function handles the functionalities over different options in the menu list
    const handleMenuList = (val:number) => {
      if(val === 2) {
        handlePinPost();
      }
      closeModal();
    }
  
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => closeModal()}>
      <Pressable style={[commonStyles.modal, {backgroundColor: modalBackdropColor}]} onPress={() => closeModal()}>

        {/* Menu list View */}
        <Pressable onPress={() => {}} style={[commonStyles.modalContainer, modalStyle,
         {
              top:
              position.y > Layout.window.height / 2
                  ? Platform.OS === 'ios'
                    ? position.y - 150
                    : position.y - 15
                  : position.y - 10,
        }
        ]}>
          {/* Menu List Items */}
          {menuItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => handleMenuList(item.id)}> 
                <Text style={[styles.listText, modalTextStyle]}>{item.Title}</Text>
              </TouchableOpacity>
            )
          })}
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default PostActionListModal