import {View, Text, Modal, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PostUI} from '../../models/postModel';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {getReportTags} from '../../store/actions/feed';
import {GetReportTagsRequest} from 'likeminds-sdk';
import {useAppSelector} from '../../store/store';
import STYLES from '../../constants/Styles';
import {LMLoader} from '../../components';
import {DELETE_TAGS_TYPE, DELETION_REASON} from '../../constants/Strings';

// delete reason's modal props
interface DeleteReasonsModalProps {
  visible: boolean;
  closeModal: () => void;
  selectedReason: (value: string) => void;
  handleDeleteModal: (value: boolean) => void;
}

type Props = DeleteReasonsModalProps & PostUI;

const DeleteReasonsModal: React.FC<Props> = props => {
  const {visible, closeModal, selectedReason, handleDeleteModal} =
    props as DeleteReasonsModalProps;
  const {modalBackdropColor} = props as PostUI;

  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const deleteTags = useAppSelector(state => state.feed.reportTags);

  // this function calls the get reason tags api for deletion
  const fetchReasonTags = async () => {
    let payload = {
      type: DELETE_TAGS_TYPE, // type 0 for delete reason tags
    };
    let reportTagsResponse = await dispatch(
      getReportTags(
        GetReportTagsRequest.builder().settype(payload.type).build(),
      ) as any,
    );
    return reportTagsResponse;
  };

  // this calls the fetchReportTags api when the modal gets visible
  useEffect(() => {
    if (visible) {
      fetchReasonTags();
    }
  }, [visible]);

  // this is the callback function that takes the selected reason tag to the delete modal
  const reasonSelection = (selectedId: any) => {
    selectedReason(selectedId);
    setSelectedIndex(-1);
    handleDeleteModal(true);
    closeModal();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setSelectedIndex(-1);
        closeModal();
      }}>
      {/* backdrop view */}
      <Pressable
        style={[
          styles.modal,
          {
            backgroundColor: modalBackdropColor
              ? modalBackdropColor
              : STYLES.$BACKGROUND_COLORS.DARKTRANSPARENT,
          },
        ]}
        onPress={() => closeModal()}>
        {/* modal view */}
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.textHeading}>{DELETION_REASON}</Text>

            {/* delete reasons list */}
            {deleteTags.length > 0 ? (
              deleteTags.map((res: any, index: number) => {
                return (
                  <Pressable
                    key={res?.id}
                    style={styles.tagItem}
                    onPress={() => {
                      setSelectedIndex(index);
                      reasonSelection(res.name);
                    }}>
                    {/* radio button view */}
                    <View style={styles.radioBtnView}>
                      <View style={[styles.reasonsBtn]}>
                        <View
                          style={[
                            styles.selectedReasonBtn,
                            {
                              backgroundColor:
                                index == selectedIndex ? '#919191' : 'white',
                              borderColor: '#919191',
                            },
                          ]}></View>
                      </View>
                    </View>

                    {/* reason text view */}
                    <View style={styles.reasonTextView}>
                      <Text style={[styles.btnText]}>{res.name}</Text>
                    </View>
                  </Pressable>
                );
              })
            ) : (
              // this renders loader until the data is fetched
              <LMLoader />
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default DeleteReasonsModal;
