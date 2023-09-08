import {Text, Modal, Pressable, Platform, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../constants/Layout';
import {styles} from './styles';
import {PostUI} from '../../models/postModel';
import {
  DELETE_POST_MENU_ITEM,
  PIN_POST_MENU_ITEM,
  POST_TYPE,
  REPORT_POST_MENU_ITEM,
  UNPIN_POST_MENU_ITEM,
} from '../../constants/Strings';
import {useAppDispatch} from '../../store/store';
import ReportModal from '../reportModal';
import DeleteModal from '../deleteModal';
import {pinPost, pinPostStateHandler} from '../../store/actions/feed';
import {PinPostRequest} from 'likeminds-sdk';

// post action list modal props
interface PostActionListProps {
  position: any;
  visible: boolean;
  closeModal: () => void;
}

type Props = PostActionListProps & PostUI;

const PostActionListModal: React.FC<Props> = props => {
  const {position, visible, closeModal} = props as PostActionListProps;
  const {modalStyle, modalTextStyle, modalBackdropColor, postDetail, postUserDetail} =
    props as PostUI;

  const dispatch = useAppDispatch();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const {menuItems, Id} = {...postDetail};

  // this function handles the functionality on the pin option
  const handlePinPost = async () => {
    let payload = {
      postId: Id,
    };
    dispatch(pinPostStateHandler(payload.postId) as any);
    let pinPostResponse = await dispatch(
      pinPost(
        PinPostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    return pinPostResponse;
  };

  // this function handles the functionality on the report option
  const handleReportPost = async () => {
    setShowReportModal(true);
  };

  // this function handles the functionality on the delete option
  const handleDeletePost = async (visible: boolean) => {
    setDeleteModal(visible);
  };

  // this function handles the functionalities over different options in the menu list
  const handleMenuList = (val: number) => {
    if (val === PIN_POST_MENU_ITEM || val === UNPIN_POST_MENU_ITEM) {
      handlePinPost();
    }
    if (val === REPORT_POST_MENU_ITEM) {
      handleReportPost();
    }
    if (val === DELETE_POST_MENU_ITEM) {
      handleDeletePost(true);
    }
    closeModal();
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => closeModal()}>
        <Pressable
          style={[styles.modal, {backgroundColor: modalBackdropColor}]}
          onPress={() => closeModal()}>
          {/* Menu list View */}
          <Pressable
            onPress={() => {}}
            style={[
              styles.modalContainer,
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
            {menuItems &&
              menuItems.map((item, index) => {
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

      {/* report modal  */}
      <ReportModal
        visible={showReportModal}
        closeModal={() => setShowReportModal(false)}
        reportType={POST_TYPE}
        postDetail={postDetail}
        postUserDetail={postUserDetail}
      />

      {/* delete modal */}
      <DeleteModal
        visible={showDeleteModal}
        displayModal={handleDeletePost}
        deleteType={POST_TYPE}
        postDetail={postDetail}
        postUserDetail={postUserDetail}
      />
    </>
  );
};

export default PostActionListModal;
