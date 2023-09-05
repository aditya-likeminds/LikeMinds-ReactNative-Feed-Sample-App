import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PostUI} from '../../Models/PostModel';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {getReportTags, postReport} from '../../store/actions/feed';
import {GetReportTagsRequest, PostReportRequest} from 'likeminds-sdk';
import {useAppSelector} from '../../store/store';
import {LMLoader} from '../../components';
import {
  COMMENT_REPORT_ENTITY_TYPE,
  COMMENT_TYPE,
  POST_REPORT_ENTITY_TYPE,
  POST_TYPE,
  REASON_FOR_DELETION_PLACEHOLDER,
  REPLY_REPORT_ENTITY_TYPE,
  REPORTED_SUCCESSFULLY,
  REPORT_INSTRUSTION,
  REPORT_PROBLEM,
  REPORT_TAGS_TYPE,
  SOMETHING_WENT_WRONG,
} from '../../constants/Strings';
import {showToastMessage} from '../../store/actions/toast';

// interface for post report api request
interface ReportRequest {
  entityId: string;
  entityType: number;
  reason: string;
  tagId: number;
  uuid: string;
}

// post report modal props
interface ReportModalProps {
  visible: boolean;
  closeModal: () => void;
  reportType: string;
}

type Props = ReportModalProps & PostUI;

const ReportModal: React.FC<Props> = props => {
  const {visible, closeModal, reportType} = props as ReportModalProps;
  const {postDetail} = props as PostUI;

  const dispatch = useDispatch();
  const {Id, uuid} = {...postDetail};
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [otherReason, setOtherReason] = useState('');
  const [selectedId, setSelectedId] = useState(-1);
  const reportTags = useAppSelector(state => state.feed.reportTags);

  // this function calls the get report tags api for reporting a post
  const fetchReportTags = async () => {
    let payload = {
      type: REPORT_TAGS_TYPE, // type 3 for report tags
    };
    let reportTagsResponse = await dispatch(
      getReportTags(
        GetReportTagsRequest.builder().settype(payload.type).build(),
      ) as any,
    );
    return reportTagsResponse;
  };

  // this function calls the report post api
  const reportPost = async ({
    entityId,
    entityType,
    reason,
    tagId,
    uuid,
  }: ReportRequest) => {
    let payload = {
      entityId: entityId,
      entityType: entityType,
      reason: reason,
      tagId: tagId,
      uuid: uuid,
    };
    let postReportResponse = await dispatch(
      postReport(
        PostReportRequest.builder()
          .setEntityId(payload.entityId)
          .setEntityType(payload.entityType)
          .setReason(payload.reason)
          .setTagId(payload.tagId)
          .setUuid(payload.uuid)
          .build()
      ) as any,
    );
    // toast message action
    if (postReportResponse) {
      dispatch(
        showToastMessage({
          isToast: true,
          message: REPORTED_SUCCESSFULLY,
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
    return postReportResponse;
  };

  useEffect(() => {
    if (visible) {
      fetchReportTags();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setSelectedId(-1);
        setSelectedIndex(-1);
        closeModal();
      }}>
      <View style={styles.page}>
        {/* header section */}
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Report Abuse</Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedId(-1);
              setSelectedIndex(-1);
              closeModal();
            }}>
            <Image
              source={require('../../assets/images/close_icon3x.png')}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>

        {/* modal content */}
        <View style={styles.contentView}>
          <Text style={styles.textHeading}>{REPORT_PROBLEM}</Text>
          <Text style={styles.text}>{REPORT_INSTRUSTION(reportType)}</Text>
        </View>

        {/* report tags list section */}
        <View style={styles.tagView}>
          {reportTags.length > 0 ? (
            reportTags?.map((res: any, index: number) => {
              return (
                <Pressable
                  key={res?.id}
                  onPress={() => {
                    setSelectedIndex(index);
                    setSelectedId(res.id);
                  }}>
                  <View
                    style={[
                      styles.reasonsBtn,
                      {
                        backgroundColor:
                          index == selectedIndex ? 'black' : 'white',
                        borderColor: '#777e8e',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.btnText,
                        {
                          color: selectedIndex == index ? 'white' : '#777e8e',
                        },
                      ]}>
                      {res.name}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <LMLoader />
            </View>
          )}
        </View>

        {/* text input view for other reason text*/}
        {selectedIndex == 5 ? (
          <View style={styles.otherSection}>
            <TextInput
              onChangeText={e => {
                setOtherReason(e);
              }}
              style={styles.otherTextInput}
              placeholder={REASON_FOR_DELETION_PLACEHOLDER}
              value={otherReason}
            />
          </View>
        ) : null}

        {/* report button */}
        <View style={styles.reportBtnParent}>
          <TouchableOpacity
            style={
              selectedId != -1 || otherReason
                ? styles.reportBtn
                : styles.disabledReportBtn
            }
            onPress={
              selectedId != -1 || otherReason
                ? () => {
                    reportPost({
                      entityId: Id,
                      entityType:
                        reportType === POST_TYPE
                          ? POST_REPORT_ENTITY_TYPE
                          : reportType === COMMENT_TYPE
                          ? COMMENT_REPORT_ENTITY_TYPE
                          : REPLY_REPORT_ENTITY_TYPE, // different entityType value for post/comment/reply
                      reason: otherReason,
                      tagId: selectedId,
                      uuid: uuid,
                    });
                    setSelectedId(-1);
                    setSelectedIndex(-1);
                    closeModal();
                  }
                : () => null
            }>
            <Text style={styles.reportBtnText}>REPORT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;
