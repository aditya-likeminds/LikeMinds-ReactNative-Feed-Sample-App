import {
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  detectURLs,
  requestStoragePermission,
  selectDoc,
  selectImageVideo,
} from '../../utils';
import {useAppSelector} from '../../store/store';
import {
  LMButton,
  LMCarousel,
  LMDocument,
  LMHeader,
  LMIcon,
  LMImage,
  LMInputText,
  LMLinkPreview,
  LMProfilePicture,
  LMText,
  LMVideo,
} from '../../../LikeMinds-ReactNative-Feed-UI';
import {
  ADD_FILES,
  ADD_IMAGES,
  ADD_MORE_MEDIA,
  ADD_VIDEOS,
  CREATE_POST_PLACEHOLDER_TEXT,
  SELECTED_IMAGE_META_FORMAT,
  SELECTED_VIDEO_META_FORMAT,
  SELECT_BOTH,
  SELECT_IMAGE,
  SELECT_VIDEO,
} from '../../constants/strings';
import {DecodeURLRequest} from 'likeminds-sdk';
import {
  getDecodedUrl,
  setUploadAttachments,
} from '../../store/actions/createPost';
import {useDispatch} from 'react-redux';
import {NavigationService} from '../../navigation';
import {UNIVERSAL_FEED} from '../../constants/screenNames';
import {
  convertImageVideoMetaData,
  convertDocumentMetaData,
  convertLinkMetaData,
} from '../../viewDataModels';
import {styles} from './styles';

const CreatePost = () => {
  const memberData = useAppSelector(state => state.feed.member);
  const dispatch = useDispatch();
  const [formattedDocumentAttachments, setFormattedDocumentAttachments] =
    useState<Array<LMAttachmentUI>>([]);
  const [formattedMediaAttachments, setFormattedMediaAttachments] = useState<
    Array<LMAttachmentUI>
  >([]);
  const [formattedLinkAttachments, setFormattedLinkAttachments] = useState<
    Array<LMAttachmentUI>
  >([]);
  const [linkPreviewData, setLinkPreviewData] = useState<Array<LMAttachmentUI>>(
    [],
  );
  const [showOptions, setShowOptions] = useState(true);
  const [postContentText, setPostContentText] = useState('');
  const [addedLinks, setAddedLinks] = useState([]);

  // function handles the selection of images and videos
  const handleGallery = async (type: string) => {
    if (Platform.OS === 'ios') {
      selectImageVideo(type).then((res: any) => {
        const selectedImagesVideos = convertImageVideoMetaData(res?.assets);
        setFormattedMediaAttachments([
          ...formattedMediaAttachments,
          ...selectedImagesVideos,
        ]);
        setShowOptions(false);
      });
    } else {
      let res = await requestStoragePermission();
      if (res === true) {
        selectImageVideo(type).then((res: any) => {
          const selectedImagesVideos = convertImageVideoMetaData(res?.assets);
          setFormattedMediaAttachments([
            ...formattedMediaAttachments,
            ...selectedImagesVideos,
          ]);
          setShowOptions(false);
        });
      }
    }
  };

  // function handles the slection of documents
  const handleDoc = async () => {
    if (Platform.OS === 'ios') {
      selectDoc().then((res: any) => {
        const selectedDocuments = convertDocumentMetaData(res);
        setFormattedDocumentAttachments([
          ...formattedDocumentAttachments,
          ...selectedDocuments,
        ]);
        setShowOptions(false);
      });
    } else {
      let res = await requestStoragePermission();
      if (res === true) {
        selectDoc().then((res: any) => {
          const selectedDocuments = convertDocumentMetaData(res);
          setFormattedDocumentAttachments([
            ...formattedDocumentAttachments,
            ...selectedDocuments,
          ]);
          setShowOptions(false);
        });
      }
    }
  };

  // function removes the selected documents
  const removeDocAttachment = (index: number) => {
    let newDocAttachments = [...formattedDocumentAttachments];
    if (formattedDocumentAttachments.length === 1) {
      setFormattedDocumentAttachments([]);
      setShowOptions(true);
    } else {
      newDocAttachments.splice(index, 1);
      setFormattedDocumentAttachments(newDocAttachments);
    }
  };

  // function removes multiple images/videos selected
  const removeMediaAttachment = (index: number) => {
    let newMediaAttachments = [...formattedMediaAttachments];
    newMediaAttachments.splice(index, 1);
    setFormattedMediaAttachments(newMediaAttachments);
  };

  // function removes single image and video selected
  const removeSingleAttachment = () => {
    setFormattedMediaAttachments([]);
    setShowOptions(true);
  };

  // function finds the valid links
  const detectLinks = async (text: string) => {
    const links = await detectURLs(text);
    // checks if any new link is detected or not
    var link_is_same =
      addedLinks?.length == links?.length &&
      addedLinks?.every(function (element, index) {
        return element === links[index];
      });
    if (links && links.length > 0 && !link_is_same) {
      links.map((item: string) => {
        const decodeUrlResponse = dispatch(
          getDecodedUrl(DecodeURLRequest.builder().setURL(item).build()) as any,
        );
        decodeUrlResponse.then((res: any) => {
          setAddedLinks(links);
          const convertedLinkData = convertLinkMetaData([res?.og_tags]);
          setFormattedLinkAttachments([
            ...formattedLinkAttachments,
            ...convertedLinkData,
          ]);
          if (linkPreviewData.length <= 0) {
            setLinkPreviewData([...linkPreviewData, ...convertedLinkData]);
          }
        });
      });
    } else if (links === undefined) {
      setFormattedLinkAttachments([]);
      setLinkPreviewData([]);
    }
    return links ? links : [];
  };

  // all image/video/document media to be uploaded
  let allAttachment = [
    ...formattedMediaAttachments,
    ...formattedDocumentAttachments,
  ];
  return (
    <SafeAreaView style={styles.container}>
      {/* screen header section*/}
      <LMHeader
        showBackArrow
        onBackPress={() => NavigationService.navigate(UNIVERSAL_FEED)}
        heading="Create a Post"
        rightComponent={
          <TouchableOpacity
            disabled={
              allAttachment?.length > 0 ||
              formattedLinkAttachments?.length > 0 ||
              postContentText != ''
                ? false
                : true
            }
            style={{
              opacity:
                allAttachment?.length > 0 ||
                formattedLinkAttachments?.length > 0 ||
                postContentText != ''
                  ? 1
                  : 0.5,
            }}
            onPress={() => {
              dispatch(
                setUploadAttachments({
                  mediaAttachmentData: allAttachment,
                  linkAttachmentData: formattedLinkAttachments,
                  postContentData: postContentText,
                }) as any,
              );
              NavigationService.goBack();
            }}>
            <Text>POST</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView>
        {/* user profile section */}
        <View style={styles.profileContainer}>
          {/* profile image */}
          <LMProfilePicture
            fallbackText={memberData.name}
            imageUrl={memberData.imageUrl}
          />
          {/* user name */}
          <LMText text={memberData.name} textStyle={styles.userNameText} />
        </View>
        {/* text input field */}
        <LMInputText
          placeholderText={CREATE_POST_PLACEHOLDER_TEXT}
          placeholderTextColor="#0F1E3D66"
          inputTextStyle={styles.textInputView}
          multilineField
          inputText={postContentText}
          onType={val => {
            setPostContentText(val);
            detectLinks(postContentText);
          }}
        />
        {/* selected media section */}
        <View>
          {/* multi media selection section */}
          {formattedMediaAttachments ? (
            formattedMediaAttachments?.length > 1 ? (
              <LMCarousel
                attachments={formattedMediaAttachments}
                showCancel
                onCancel={index => removeMediaAttachment(index)}
              />
            ) : (
              <>
                {/* single image selected section */}
                {formattedMediaAttachments[0]?.attachmentMeta?.format ===
                  SELECTED_IMAGE_META_FORMAT && (
                  <LMImage
                    imageUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel
                    onCancel={() => removeSingleAttachment()}
                  />
                )}
                {/* single video selected section  */}
                {formattedMediaAttachments[0]?.attachmentMeta.format ===
                  SELECTED_VIDEO_META_FORMAT && (
                  <LMVideo
                    videoUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel
                    onCancel={() => removeSingleAttachment()}
                  />
                )}
              </>
            )
          ) : null}
          {/* selected document view section */}
          {formattedDocumentAttachments &&
            formattedDocumentAttachments.length >= 1 && (
              <LMDocument
                attachments={formattedDocumentAttachments}
                showCancel
                onCancel={index => removeDocAttachment(index)}
              />
            )}
          {/* added link preview section */}
          {formattedMediaAttachments.length <= 0 &&
            formattedDocumentAttachments.length <= 0 &&
            linkPreviewData &&
            linkPreviewData.length >= 1 && (
              <LMLinkPreview
                attachments={linkPreviewData}
                showCancel
                onCancel={() => {
                  setLinkPreviewData([]);
                }}
              />
            )}
        </View>
        {/* add more media button section */}
        {(formattedMediaAttachments.length > 0 ||
          formattedDocumentAttachments?.length > 0) && (
          <LMButton
            onTap={
              formattedMediaAttachments.length > 0
                ? () => handleGallery(SELECT_BOTH)
                : formattedDocumentAttachments.length > 0
                ? () => handleDoc()
                : () => {}
            }
            icon={{
              assetPath: require('../../assets/images/plusAdd_icon3x.png'),
              type: 'png',
              height: 20,
              width: 20,
            }}
            text={{
              text: ADD_MORE_MEDIA,
              textStyle: {
                fontSize: 14,
                fontWeight: '500',
                color: '#5046E5',
                marginLeft: 5,
              },
            }}
            buttonStyle={styles.addMoreButtonView}
          />
        )}
      </ScrollView>
      {/* selection options section */}
      {showOptions && (
        <View style={styles.selectionOptionsView}>
          {/* add photos button */}
          <TouchableOpacity
            style={styles.optionItemView}
            onPress={() => {
              handleGallery(SELECT_IMAGE);
            }}>
            <LMIcon
              type="png"
              assetPath={require('../../assets/images/gallery_icon3x.png')}></LMIcon>
            <LMText
              text={ADD_IMAGES}
              textStyle={{marginLeft: 8, color: '#222020'}}
            />
          </TouchableOpacity>
          {/* add video button */}
          <TouchableOpacity
            style={styles.optionItemView}
            onPress={() => {
              handleGallery(SELECT_VIDEO);
            }}>
            <LMIcon
              type="png"
              assetPath={require('../../assets/images/video_icon3x.png')}></LMIcon>
            <LMText
              text={ADD_VIDEOS}
              textStyle={{marginLeft: 8, color: '#222020'}}
            />
          </TouchableOpacity>
          {/* add files button */}
          <TouchableOpacity
            style={styles.optionItemView}
            onPress={() => {
              handleDoc();
            }}>
            <LMIcon
              type="png"
              assetPath={require('../../assets/images/paperClip_icon3x.png')}></LMIcon>
            <LMText
              text={ADD_FILES}
              textStyle={{marginLeft: 8, color: '#222020'}}
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreatePost;
