import {
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
  ADD_POST_TEXT,
  ADD_VIDEOS,
  CREATE_POST_PLACEHOLDER_TEXT,
  IMAGE_ATTACHMENT_TYPE,
  SELECT_BOTH,
  SELECT_IMAGE,
  SELECT_VIDEO,
  VIDEO_ATTACHMENT_TYPE,
} from '../../constants/strings';
import {DecodeURLRequest} from 'testpackageforlikeminds';
import _, {debounce} from 'lodash';
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
import {showToastMessage} from '../../store/actions/toast';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';

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
  const [showLinkPreview, setShowLinkPreview] = useState(false);
  const [closedOnce, setClosedOnce] = useState(false);
  // const [linkPreviewData, setLinkPreviewData] = useState<Array<LMAttachmentUI>>(
  //   [],
  // );
  const [showOptions, setShowOptions] = useState(true);
  const [showSelecting, setShowSelecting] = useState(false);
  const [postContentText, setPostContentText] = useState('');
  const [addedLinks, setAddedLinks] = useState([]);
  const MAX_FILE_SIZE = 104857600; // 100MB in bytes
  const MIN_FILE_SIZE = 100000; // 100KB in bytes
  // function handles the selection of images and videos
  const handleGallery = async (type: string) => {
    if (Platform.OS === 'ios') {
      selectImageVideo(type)?.then((res: any) => {
        setShowSelecting(true)
        if(res?.didCancel) {
          setShowSelecting(false)
        }
        const mediaWithSizeCheck = [];
        for (const media of res?.assets) {
          if (media.fileSize > MAX_FILE_SIZE || media.fileSize < MIN_FILE_SIZE) {
            dispatch(
              showToastMessage({
                isToast: true,
                message: 'Files below 100 KB and above 100MB are not allowed',
              }) as any,
            );
          } else {
            mediaWithSizeCheck.push(media);             
          }
        }
          const selectedImagesVideos = convertImageVideoMetaData(mediaWithSizeCheck);
          if (
            selectedImagesVideos.length + formattedMediaAttachments.length >
            10
          ) {
            setFormattedMediaAttachments([...formattedMediaAttachments]);
            setShowSelecting(false)
            dispatch(
              showToastMessage({
                isToast: true,
                message: 'You can select upto 10 items!',
              }) as any,
            );
          } else {
            setShowOptions(false);    
            setShowSelecting(false)
            setFormattedMediaAttachments([
              ...formattedMediaAttachments,
              ...selectedImagesVideos,
            ]);
            
          } 
      });
    } else {
      let res = await requestStoragePermission();
      if (res === true) {
        selectImageVideo(type)?.then((res: any) => {
          const mediaWithSizeCheck = [];
        for (const media of res?.assets) {
          if (media.fileSize > MAX_FILE_SIZE || media.fileSize < MIN_FILE_SIZE) {
            dispatch(
              showToastMessage({
                isToast: true,
                message: 'Files below 100 KB and above 100MB are not allowed',
              }) as any,
            );
          } else {
            mediaWithSizeCheck.push(media);       
          }
        }
          const selectedImagesVideos = convertImageVideoMetaData(mediaWithSizeCheck);
          if (
            selectedImagesVideos.length + formattedMediaAttachments.length >
            10
          ) {
            setFormattedMediaAttachments([...formattedMediaAttachments]);
            dispatch(
              showToastMessage({
                isToast: true,
                message: 'You can select upto 10 items!',
              }) as any,
            );
          } else {
            setShowOptions(false);   
            setFormattedMediaAttachments([
              ...formattedMediaAttachments,
              ...selectedImagesVideos,
            ]);
          }
          
        });
      }
    }
  };

  // function handles the slection of documents
  const handleDocument = async () => {
    if (Platform.OS === 'ios') {
      selectDoc()?.then((res: any) => {
        const mediaWithSizeCheck = [];
        for (const media of res) {
          if (media.size > MAX_FILE_SIZE || media.size < MIN_FILE_SIZE) {
            dispatch(
              showToastMessage({
                isToast: true,
                message: 'Files below 100 KB and above 100MB are not allowed',
              }) as any,
            );
          } else {
            mediaWithSizeCheck.push(media);      
          }
        }
        const selectedDocuments = convertDocumentMetaData(mediaWithSizeCheck);
        if (
          selectedDocuments.length + formattedDocumentAttachments.length >
          10
        ) {
          setFormattedDocumentAttachments([...formattedDocumentAttachments]);
          dispatch(
            showToastMessage({
              isToast: true,
              message: 'You can select upto 10 items!',
            }) as any,
          );
        } else {
          setFormattedDocumentAttachments([
            ...formattedDocumentAttachments,
            ...selectedDocuments,
          ]);
          setShowOptions(false);
        }
      });
    } else {
      let res = await requestStoragePermission();
      if (res === true) {
        selectDoc()?.then((res: any) => {
          const mediaWithSizeCheck = [];
          for (const media of res) {
            if (media.size > MAX_FILE_SIZE || media.size < MIN_FILE_SIZE) {
              dispatch(
                showToastMessage({
                  isToast: true,
                  message: 'Files below 100 KB and above 100MB are not allowed',
                }) as any,
              );
            } else {
              mediaWithSizeCheck.push(media);      
            }
          }
          const selectedDocuments = convertDocumentMetaData(mediaWithSizeCheck);
          if (
            selectedDocuments.length + formattedDocumentAttachments.length >
            10
          ) {
            setFormattedDocumentAttachments([...formattedDocumentAttachments]);
            dispatch(
              showToastMessage({
                isToast: true,
                message: 'You can select upto 10 items!',
              }) as any,
            );
          } else {
            setShowOptions(false);    
            setFormattedDocumentAttachments([
              ...formattedDocumentAttachments,
              ...selectedDocuments,
            ]);
          }
        });
      }
    }
  };

  // function removes the selected documents
  const removeDocumentAttachment = (index: number) => {
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

  useEffect(() => {
    const debouncedSearch = _.debounce(text => {
      // Perform your search or update your component's state here
      const links = detectURLs(text);

      if (links && links.length > 0) {
        const responsePromises = links.map((item: string) => {
          return new Promise((resolve, reject) => {
            const decodeUrlResponse = dispatch(
              getDecodedUrl(
                DecodeURLRequest.builder().setURL(item).build(),
              ) as any,
            );
            decodeUrlResponse
              .then((res: any) => {
                resolve(res?.og_tags);
              })
              .catch((error: any) => {
                reject(error);
              });
          });
        });

        Promise.all(responsePromises)
          .then(async responses => {
            if(!responses.includes(undefined)) {
              const convertedLinkData = await convertLinkMetaData(responses);
              setFormattedLinkAttachments(convertedLinkData);
              if (!closedOnce) {
                setShowLinkPreview(true);
              }
            }
            // Do something with the array of responses
          })
          .catch(error => {
            console.error('An error occurred:', error);
          });
      } else {
        setFormattedLinkAttachments([]);
      }
    }, 500); // 300ms delay

    debouncedSearch(postContentText);

    return () => {
      debouncedSearch.cancel(); // Cleanup the debounced function
    };
  }, [postContentText]);

  

  // all image/video/document media to be uploaded
  let allAttachment = [
    ...formattedMediaAttachments,
    ...formattedDocumentAttachments,
  ];

  const onChangeText = (text: string) => {
    setPostContentText(text)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* screen header section*/}
      <LMHeader
        showBackArrow
        onBackPress={() => NavigationService.navigate(UNIVERSAL_FEED)}
        heading="Create a Post"
        rightComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            disabled={
              allAttachment?.length > 0 ||
              formattedLinkAttachments?.length > 0 ||
              postContentText.trim() != ''
                ? false
                : true
            }
            style={{
              opacity:
                allAttachment?.length > 0 ||
                formattedLinkAttachments?.length > 0 ||
                postContentText.trim() != ''
                  ? 1
                  : 0.5,
            }}
            onPress={() => {
              dispatch(
                setUploadAttachments({
                  mediaAttachmentData: allAttachment,
                  linkAttachmentData: formattedLinkAttachments,
                  postContentData: postContentText.trim(),
                }) as any,
              );
              NavigationService.goBack();
            }}>
            <Text style={{color: '#5046E5', fontSize: 16, fontWeight: '500'}}>
              {ADD_POST_TEXT}
            </Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={{flex: 1, marginBottom: showOptions ? 125 : 0}}>
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
            onChangeText(val);
          }}
        />

        {/* selected media section */}
        <View>
          {/* multi media selection section */}
          {(showSelecting ? <View style={{height:300, justifyContent:'center', alignItems:'center'}}>
                <LMLoader size={10}/>
                <Text style={{color:'#666666', marginTop:12}}>Fetching Media</Text>
              </View> : formattedMediaAttachments ? (
            formattedMediaAttachments?.length > 1 ?
              (<LMCarousel
                attachments={formattedMediaAttachments}
                showCancel
                videoItem={{videoUrl: '', showControls: true}}
                onCancel={index => removeMediaAttachment(index)}
              />)
            
            : (
              <>
                {/* single image selected section */}
                {formattedMediaAttachments[0]?.attachmentType ===
                  IMAGE_ATTACHMENT_TYPE && (
                  <LMImage
                    imageUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel
                    onCancel={() => removeSingleAttachment()}
                  />
                )}
                {/* single video selected section  */}
                {formattedMediaAttachments[0]?.attachmentType ===
                  VIDEO_ATTACHMENT_TYPE && (
                  <LMVideo
                    videoUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel
                    showControls
                    looping={false}
                    onCancel={() => removeSingleAttachment()}
                  />
                )
                }
              </>
            )
          ) : null)}
          {/* selected document view section */}
          {formattedDocumentAttachments &&
            formattedDocumentAttachments.length >= 1 && (
              <LMDocument
                attachments={formattedDocumentAttachments}
                showCancel
                showMoreText={false}
                onCancel={index => removeDocumentAttachment(index)}
              />
            )}
          {/* added link preview section */}
          {formattedMediaAttachments.length <= 0 &&
            formattedDocumentAttachments.length <= 0 &&
            showLinkPreview &&
            formattedLinkAttachments.length >= 1 && (
              <LMLinkPreview
                attachments={formattedLinkAttachments}
                showCancel
                onCancel={() => {
                  setShowLinkPreview(false);
                  setClosedOnce(true);
                  setFormattedLinkAttachments([]);
                }}
              />
            )}
        </View>
        {/* add more media button section */}
        {(allAttachment.length > 0 && allAttachment.length < 10) && (
          <LMButton
            onTap={
              formattedMediaAttachments.length > 0
                ? () => handleGallery(SELECT_BOTH)
                : formattedDocumentAttachments.length > 0
                ? () => handleDocument()
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
              textStyle: styles.addMoreButtonText,
            }}
            buttonStyle={styles.addMoreButtonView}
          />
        )}
      </ScrollView>
      {/* selection options section */}
      {showOptions && (
        <View>
        <View style={styles.selectionOptionsView}>
          {/* add photos button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.optionItemView}
            onPress={() => {
              handleGallery(SELECT_IMAGE);
            }}>
            <LMIcon
              type="png"
              assetPath={require('../../assets/images/gallery_icon3x.png')}></LMIcon>
            <LMText text={ADD_IMAGES} textStyle={styles.selectionOptionstext} />
          </TouchableOpacity>
          {/* add video button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.optionItemView}
            onPress={() => {
              handleGallery(SELECT_VIDEO);
            }}>
            <LMIcon
              type="png"
              assetPath={require('../../assets/images/video_icon3x.png')}></LMIcon>
            <LMText text={ADD_VIDEOS} textStyle={styles.selectionOptionstext} />
          </TouchableOpacity>
          {/* add files button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.optionItemView}
            onPress={() => {
              handleDocument();
            }}>
            <LMIcon
              type="png"
              assetPath={require('../../assets/images/paperClip_icon3x.png')}></LMIcon>
            <LMText text={ADD_FILES} textStyle={styles.selectionOptionstext} />
          </TouchableOpacity>
        </View>

        </View>
      )}
    </SafeAreaView>
  );
};

export default CreatePost;
