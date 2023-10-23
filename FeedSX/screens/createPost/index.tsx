import {
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {requestStoragePermission} from '../../utils';
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
import Layout from '../../constants/Layout';
import {
  DOCUMENT_ATTACHMENT_TYPE,
  IMAGE_ATTACHMENT_TYPE,
  LINK_ATTACHMENT_TYPE,
  VIDEO_ATTACHMENT_TYPE,
} from '../../constants/Strings';
import {DecodeURLRequest} from 'likeminds-sdk';
import {
  getDecodedUrl,
  setUploadAttachments,
} from '../../store/actions/createPost';
import {useDispatch} from 'react-redux';
import {NavigationService} from '../../navigation';

// selected image/video format interface
interface imageDefaultFormat {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
  bitrate?: number;
  duration?: number;
  originalPath?: string;
}
// selected document format interface
interface docDefaultFormat {
  name: string;
  size: number;
  fileCopyUri: null;
  type: string;
  uri: string;
}

const CreatePost = () => {
  const memberData = useAppSelector(state => state.feed.member);
  const dispatch = useDispatch();
  const [formattedDocAttachments, setFormattedDocAttachments] = useState<
    Array<LMAttachmentUI>
  >([]);
  const [formattedMediaAttachments, setFormattedMediaAttachments] = useState<
    Array<LMAttachmentUI>
  >([]);
  const [formattedLinkAttachments, setFormattedLinkAttachments] = useState<
    Array<LMAttachmentUI>
  >([]);
  const [showOptions, setShowOptions] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [postContentText, setPostContentText] = useState('');
  const MAX_FILE_SIZE = 104857600; // 100MB in bytes

  // convert the default selected image/video format to LMAttachmentUI
  function convertData(data: imageDefaultFormat[]): LMAttachmentUI[] {
    const convertedData = data.map(item => {
      return {
        attachmentMeta: {
          entityId: '', // You need to specify the entity ID.
          format: item.type,
          name: item.fileName,
          ogTags: {
            description: '',
            title: '',
            url: '',
            image: '',
          },
          size: item.fileSize,
          duration: item.duration, // You need to specify the duration.
          pageCount: 0, // You need to specify the page count.
          url: item.uri,
        },
        attachmentType:
          item.type === 'image/jpg'
            ? IMAGE_ATTACHMENT_TYPE
            : item.type === 'video/mp4'
            ? VIDEO_ATTACHMENT_TYPE
            : 0, // You need to specify the attachment type.
      };
    });
    setFormattedMediaAttachments([
      ...formattedMediaAttachments,
      ...convertedData,
    ]);
    return convertedData;
  }

  // convert the default selected document format to LMAttachmentUI
  function convertDocData(data: docDefaultFormat[]): LMAttachmentUI[] {
    const convertedData = data.map(item => {
      return {
        attachmentMeta: {
          entityId: '', // You need to specify the entity ID.
          format: item.type,
          name: item.name,
          ogTags: {
            description: '',
            title: '',
            url: '',
            image: '',
          },
          size: item.size,
          duration: 0, // You need to specify the duration.
          pageCount: 0, // You need to specify the page count.
          url: item.uri,
        },
        attachmentType:
          item.type === 'application/pdf' ? DOCUMENT_ATTACHMENT_TYPE : 0, // You need to specify the attachment type.
      };
    });
    setFormattedDocAttachments([...formattedDocAttachments, ...convertedData]);
    return convertedData;
  }

  // convert the LMOGTagsUI to LMAttachmentUI
  function convertLinkData(data: LMOGTagsUI[]): LMAttachmentUI[] {
    const convertedData = data.map(item => {
      return {
        attachmentMeta: {
          entityId: '', // You need to specify the entity ID.
          format: '',
          name: '',
          ogTags: {
            description: item.description,
            title: item.title,
            url: item.url,
            image: item.image,
          },
          size: 0,
          duration: 0, // You need to specify the duration.
          pageCount: 0, // You need to specify the page count.
          url: '',
        },
        attachmentType: LINK_ATTACHMENT_TYPE, // You need to specify the attachment type.
      };
    });
    setFormattedLinkAttachments([
      ...formattedLinkAttachments,
      ...convertedData,
    ]);
    return convertedData;
  }

  //select Images and videoes From Gallery
  const selectGalley = async (type: string) => {
    const options = {
      mediaType: type,
      selectionLimit: 0,
    };
    await launchImageLibrary(options as any, async (response: any) => {
      if (response?.didCancel) {
        console.log('didCancel', response.didCancel);
      }
      let selectedImages = response?.assets; // selectedImages can be anything images or videos or both

      for (let i = 0; i < selectedImages?.length; i++) {
        if (selectedImages[i].fileSize >= MAX_FILE_SIZE) {
          console.log('Files above 100 MB is not allowed');
          return;
        }
      }
      if (!!selectedImages) {
        convertData(selectedImages);
        setShowOptions(false);
      }
    });
  };

  //select Documents From Gallery
  const selectDoc = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      let selectedDocs: any = response; // selectedImages can be anything images or videos or both
      let docsArrlength = selectedDocs?.length;
      if (docsArrlength > 0) {
        for (let i = 0; i < docsArrlength; i++) {
          if (selectedDocs[i].size >= MAX_FILE_SIZE) {
            console.log('Files above 100 MB is not allowed');
            return;
          }
        }
        if (!!selectedDocs) {
          convertDocData(selectedDocs);
          setShowOptions(false);
        }
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  // function handles the selection of images and videos
  const handleGallery = async (type: string) => {
    if (Platform.OS === 'ios') {
      selectGalley(type);
    } else {
      let res = await requestStoragePermission();
      if (res === true) {
        selectGalley(type);
      }
    }
  };

  // function handles the slection of documents
  const handleDoc = async () => {
    if (Platform.OS === 'ios') {
      selectDoc();
    } else {
      let res = await requestStoragePermission();
      if (res === true) {
        selectDoc();
      }
    }
  };

  // function removes the selected documents
  const removeDocAttachment = (index: number) => {
    let newDocAttachments = [...formattedDocAttachments];
    if (formattedDocAttachments.length === 1) {
      setFormattedDocAttachments([]);
      setShowOptions(true);
    } else {
      newDocAttachments.splice(index, 1);
      setFormattedDocAttachments(newDocAttachments);
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
  const detectLinks = (text: string) => {
    const regex = /\b(?:https?:\/\/)?(?:[\w.]+\.\w+)(?:(?<=\\n)|\b)/;
    const links = text.match(regex);

    if (!showPreview && links?.length === 1) {
      const decodeUrlResponse = dispatch(
        getDecodedUrl(
          DecodeURLRequest.builder().setURL(`${links}`).build(),
        ) as any,
      );
      decodeUrlResponse.then((res: any) => {
        convertLinkData([res.og_tags]);
      });
      setShowPreview(true);
    } else if (links?.length !== 1) {
      setFormattedLinkAttachments([]);
      setShowPreview(false);
    }
    return links ? links : [];
  };

  let allAttachment = [
    ...formattedMediaAttachments,
    ...formattedDocAttachments,
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* screen header section*/}
      <LMHeader
        showBackArrow
        onBackPress={() => NavigationService.navigate('UniversalFeed')}
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingTop: 12,
          }}>
          {/* profile image */}
          <LMProfilePicture
            fallbackText={memberData.name}
            imageUrl={memberData.imageUrl}
          />
          {/* user name */}
          <LMText
            text={memberData.name}
            textStyle={{
              fontSize: 16,
              fontWeight: '500',
              color: '#222020',
              marginLeft: 8,
              textTransform: 'capitalize',
            }}
          />
        </View>
        {/* text input field */}
        <LMInputText
          placeholderText="Write something here..."
          placeholderTextColor="#0F1E3D66"
          inputTextStyle={{
            marginHorizontal: 15,
            marginVertical: 8,
            fontSize: 16,
            elevation: 0,
          }}
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
                {formattedMediaAttachments[0]?.attachmentMeta.format ===
                  'image/jpg' && (
                  <LMImage
                    imageUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel
                    onCancel={() => removeSingleAttachment()}
                  />
                )}
                {/* single video selected section  */}
                {formattedMediaAttachments[0]?.attachmentMeta.format ===
                  'video/mp4' && (
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
          {formattedDocAttachments && formattedDocAttachments.length >= 1 && (
            <LMDocument
              attachments={formattedDocAttachments}
              showCancel
              onCancel={index => removeDocAttachment(index)}
            />
          )}
          {/* added link preview section */}
          {formattedMediaAttachments.length <= 0 &&
            formattedDocAttachments.length <= 0 &&
            formattedLinkAttachments &&
            formattedLinkAttachments.length >= 1 && (
              <LMLinkPreview
                attachments={formattedLinkAttachments}
                showCancel
                onCancel={() => {
                  setFormattedLinkAttachments([]);
                }}
              />
            )}
        </View>
        {/* add more media button section */}
        {(formattedMediaAttachments.length > 0 ||
          formattedDocAttachments?.length > 0) && (
          <LMButton
            onTap={
              formattedMediaAttachments.length > 0
                ? () => handleGallery('mixed')
                : formattedDocAttachments.length > 0
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
              text: 'Add More',
              textStyle: {
                fontSize: 14,
                fontWeight: '500',
                color: '#5046E5',
                marginLeft: 5,
              },
            }}
            buttonStyle={{
              width: '35%',
              borderColor: '#5046E5',
              borderWidth: 1,
              borderRadius: 8,
              alignSelf: 'center',
              paddingVertical: 8,
              marginTop: 20,
            }}
          />
        )}
      </ScrollView>
      {/* selection options section */}
      {showOptions && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: Layout.window.width,
            backgroundColor: '#fff',
          }}>
          {/* add photos button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#D0D8E280',
              borderBottomWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 7,
            }}
            onPress={() => {
              handleGallery('photo');
            }}>
            <LMIcon
              type="png"
              assetPath={require('../../assets/images/gallery_icon3x.png')}></LMIcon>
            <LMText
              text="Add Photo"
              textStyle={{marginLeft: 8, color: '#222020'}}
            />
          </TouchableOpacity>
          {/* add video button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#D0D8E280',
              borderBottomWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 7,
            }}
            onPress={() => {
              handleGallery('video');
            }}>
            <LMIcon
              type="png"
              assetPath={require('../../assets/images/video_icon3x.png')}></LMIcon>
            <LMText
              text="Add Video"
              textStyle={{marginLeft: 8, color: '#222020'}}
            />
          </TouchableOpacity>
          {/* add files button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#D0D8E280',
              borderBottomWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 7,
            }}
            onPress={() => {
              handleDoc();
            }}>
            <LMIcon
              type="png"
              assetPath={require('../../assets/images/paperClip_icon3x.png')}></LMIcon>
            <LMText
              text="Attach Files"
              textStyle={{marginLeft: 8, color: '#222020'}}
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreatePost;
