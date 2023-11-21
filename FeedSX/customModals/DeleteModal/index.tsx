import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {deletePost, deletePostStateHandler} from '../../store/actions/feed';
import {DeletePostRequest} from '@likeminds.community/feed-js';
import {useAppSelector} from '../../store/store';
import DeleteReasonsModal from '../DeleteReasonsModal';
import {showToastMessage} from '../../store/actions/toast';
import {
  CONFIRM_DELETE,
  DELETION_REASON,
  POST_DELETE,
  REASON_FOR_DELETION_PLACEHOLDER,
  SOMETHING_WENT_WRONG,
} from '../../constants/Strings';
import STYLES from '../../constants/Styles';
import Toast from 'react-native-toast-message';

// delete modal's props
interface DeleteModalProps {
  visible: boolean;
  displayModal: (value: boolean) => void;
  deleteType: string;
  postDetail: LMPostUI;
  modalBackdropColor?: string;
}

const DeleteModal = ({
  visible,
  displayModal,
  deleteType,
  postDetail,
  modalBackdropColor,
}: DeleteModalProps) => {
  const {id, userId} = {...postDetail};

  const dispatch = useDispatch();
  const loggedInUser = useAppSelector(state => state.feed.member);
  const [deletionReason, setDeletionReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [showReasons, setShowReasons] = useState(false);

  // this function calls the delete post api
  const postDelete = async () => {
    if (!deletionReason && loggedInUser.userUniqueId != userId) {
      showToast();
    } else {
      const payload = {
        deleteReason: otherReason ? otherReason : deletionReason,
        postId: id,
      };
      displayModal(false);
      dispatch(deletePostStateHandler(payload.postId) as any);
      const deletePostResponse = await dispatch(
        deletePost(
          DeletePostRequest.builder()
            .setdeleteReason(payload.deleteReason)
            .setpostId(payload.postId)
            .build(),
        ) as any,
      );
      // toast message action
      if (deletePostResponse) {
        setDeletionReason('');
        dispatch(
          showToastMessage({
            isToast: true,
            message: POST_DELETE,
          }) as any,
        );
      } else {
        dispatch(
          showToastMessage({
            isToast: true,
            message: SOMETHING_WENT_WRONG,
          }) as any,
        );
      }
      return deletePostResponse;
    }
  };

  // this callback function gets the reason of deletion from the reasons modal
  const selectedReasonForDelete = (val: string) => {
    setDeletionReason(val);
  };

  // this show the toast message over the modal
  const showToast = () => {
    Toast.show({
      position: 'bottom',
      type: 'deleteToastView',
      autoHide: true,
      visibilityTime: 1500,
    });
  };

  // delete toast message view UI
  const toastConfig = {
    deleteToastView: () => (
      <View>
        <View>
          <View style={styles.modalView}>
            <Text style={styles.filterText}>
              {'Please select a reason for deletion'}
            </Text>
          </View>
        </View>
      </View>
    ),
  };
  return (
    <>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => displayModal(false)}>
        <>
          {/* conditonal render of delete reason's modal and delete modal */}
          {showReasons ? (
            <DeleteReasonsModal
              visible={showReasons}
              handleDeleteModal={displayModal}
              selectedReason={selectedReasonForDelete}
              closeModal={() => setShowReasons(false)}
            />
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.modal,
                  {
                    backgroundColor: modalBackdropColor
                      ? modalBackdropColor
                      : STYLES.$BACKGROUND_COLORS.DARKTRANSPARENT,
                  },
                ]}
                onPress={() => displayModal(false)}>
                {/* toast component */}
                <Toast config={toastConfig} />
                {/* main modal section */}
                <TouchableWithoutFeedback>
                  <View style={styles.modalContainer}>
                    <Text style={styles.textHeading}>Delete {deleteType}?</Text>
                    <Text style={styles.text}>
                      {CONFIRM_DELETE(deleteType)}
                    </Text>

                    {/* delete reason selection section */}
                    {loggedInUser.userUniqueId != userId && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          setShowReasons(true);
                        }}>
                        <View style={styles.reasonsSelectionView}>
                          {deletionReason ? (
                            <Text style={styles.text}>{deletionReason}</Text>
                          ) : (
                            <Text style={styles.reasonText}>
                              {DELETION_REASON}
                              <Text style={{color: 'red'}}>*</Text>
                            </Text>
                          )}
                          <Image
                            source={require('../../assets/images/dropdown_icon3x.png')}
                            style={styles.dropdownIcon}
                          />
                        </View>
                      </TouchableOpacity>
                    )}

                    {/* text input view for other reason text*/}
                    {deletionReason == 'Others' ? (
                      <TextInput
                        onChangeText={e => {
                          setOtherReason(e);
                        }}
                        style={styles.otherTextInput}
                        placeholder={REASON_FOR_DELETION_PLACEHOLDER}
                        value={otherReason}
                      />
                    ) : null}

                    <View style={styles.buttonsContainer}>
                      {/* cancel button section */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          displayModal(false);
                          setDeletionReason('');
                        }}>
                        <Text style={styles.cancelTextBtn}>CANCEL</Text>
                      </TouchableOpacity>
                      {/* delete button section  */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => postDelete()}>
                        <Text style={styles.deleteTextBtn}>DELETE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </>
          )}
        </>
      </Modal>
    </>
  );
};

export default DeleteModal;
