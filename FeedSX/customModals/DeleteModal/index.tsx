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
import {PostUI} from '../../models/postModel';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {deletePost, deletePostStateHandler} from '../../store/actions/feed';
import {DeletePostRequest} from 'likeminds-sdk';
import {useAppSelector} from '../../store/store';
import DeleteReasonsModal from '../deleteReasonsModal';
import STYLES from '../../constants/Styles';
import {showToastMessage} from '../../store/actions/toast';
import {
  CONFIRM_DELETE,
  DELETION_REASON,
  REASON_FOR_DELETION_PLACEHOLDER,
} from '../../constants/Strings';

// delete modal's props
interface DeleteModalProps {
  visible: boolean;
  displayModal: (value: boolean) => void;
  deleteType: string;
}
type Props = DeleteModalProps & PostUI;

const DeleteModal: React.FC<Props> = props => {
  const {visible, displayModal, deleteType} = props as DeleteModalProps;
  const {postDetail, modalBackdropColor} = props as PostUI;

  const dispatch = useDispatch();
  const loggedInUser = useAppSelector(state => state.feed.member);
  const {Id, userId} = {...postDetail};
  const [deletionReason, setDeletionReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [showReasons, setShowReasons] = useState(false);

  // this function calls the delete post api
  const postDelete = async () => {
    let payload = {
      deleteReason: otherReason ? otherReason : deletionReason,
      postId: Id,
    };
    displayModal(false);
    dispatch(deletePostStateHandler(payload.postId) as any);
    let deletePostResponse = await dispatch(
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
          message: 'Deleted Successfully',
        }) as any,
      );
    } else {
      dispatch(
        showToastMessage({
          isToast: true,
          message: 'Something Went Wrong',
        }) as any,
      );
    }
    return deletePostResponse;
  };

  // this callback function gets the reason of deletion from the reasons modal
  const selectedReasonForDelete = (val: string) => {
    setDeletionReason(val);
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => displayModal(false)}>
        <>
          {showReasons ? (
            <DeleteReasonsModal
              visible={showReasons}
              handleDeleteModal={displayModal}
              selectedReason={selectedReasonForDelete}
              closeModal={() => setShowReasons(false)}
              postDetail={postDetail}
            />
          ) : (
            <>
              <TouchableOpacity
                style={[
                  styles.modal,
                  {
                    backgroundColor: modalBackdropColor
                      ? modalBackdropColor
                      : STYLES.$BACKGROUND_COLORS.DARKTRANSPARENT,
                  },
                ]}
                onPress={() => displayModal(false)}>
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
                        onPress={() => {
                          displayModal(false);
                          setDeletionReason('');
                        }}>
                        <Text style={styles.cancelTextBtn}>CANCEL</Text>
                      </TouchableOpacity>
                      {/* delete button section  */}
                      <TouchableOpacity
                        disabled={
                          loggedInUser.userUniqueId != userId
                            ? otherReason || deletionReason
                              ? false
                              : true
                            : false
                        }
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
