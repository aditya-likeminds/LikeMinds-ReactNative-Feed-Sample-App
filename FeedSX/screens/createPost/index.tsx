import {View, Platform, TouchableOpacity, SafeAreaView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {requestStoragePermission} from '../../utils';
import {useAppSelector} from '../../store/store';
import {
  LMButton,
  LMCarousel,
  LMDocument,
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
import { lmFeedClient } from '../../..';
import { DecodeURLRequest } from 'likeminds-sdk';

interface imageFormat {
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
interface docFormat {
  name: string;
  size: number;
  fileCopyUri: null;
  type: string;
  uri: string;
}

const CreatePost = () => {
  const memberData = useAppSelector(state => state.feed.member);
  const [selectedMedia, setSelectedMedia] = useState<Array<imageFormat>>([]);
  const [selectedDocMedia, setSelectedDocMedia] = useState<Array<docFormat>>(
    [],
  );
  const [addedLink, setAddedLink] = useState<Array<LMOGTagsUI>>();
  const [showOptions, setShowOptions] = useState(true);
  const [postContentText, setPostContentText] = useState('');
  const MAX_FILE_SIZE = 104857600; // 100MB in bytes
  const MAX_LENGTH = 300;

  function convertData(data: imageFormat[]): LMAttachmentUI[] {
    return data.map(item => {
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
  }

  function convertDocData(data: docFormat[]): LMAttachmentUI[] {
    return data.map(item => {
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
  }

  function convertLinkData(data: LMOGTagsUI[]): LMAttachmentUI[] {
    return data.map(item => {
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
        attachmentType: LINK_ATTACHMENT_TYPE // You need to specify the attachment type.
      };
    });
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
        setSelectedMedia(selectedImages);
        setSelectedMedia([...selectedMedia, ...selectedImages]);
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

        //loop is for appending thumbanil in the object we get from document picker
        for (let i = 0; i < selectedDocs?.length; i++) {
          selectedDocs[i] = {
            ...selectedDocs[i],
          };
        }
        if(!!selectedDocs) {
          setSelectedDocMedia(selectedDocs);
          setSelectedDocMedia([...selectedDocMedia, ...selectedDocs])
          setShowOptions(false)
        }
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  // useEffect(() =>{
  //   convertDocData(selectedDocMedia)
  // }, [selectedDocMedia])

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

  const remove = (index: number) => {
    console.log(index)
    if(selectedDocMedia.length===1) {
      setSelectedDocMedia([])
      setShowOptions(true)
    } else {
   setSelectedDocMedia(selectedDocMedia.splice(index,1))
 }

  }

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



  const detectLinks = (text: string) => {
    const regex = /\b(?:https?:\/\/)?(?:[\w.]+\.\w+)(?:(?<=\\n)|\b)/g;
    const links = text.match(regex);
    if(links?.length === 1) {
      const abc = lmFeedClient.decodeURL(DecodeURLRequest.builder().setURL(`${links}`).build())
      abc.then(res => {
        setAddedLink([res.og_tags])
      }).then(() => {
        console.log(addedLink)
      })
    }
    return links ? links : [];
}
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingTop: 12,
        }}>
        <LMProfilePicture
          fallbackText={memberData.name}
          imageUrl={memberData.imageUrl}
        />
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
        onType={(val) => {
          setPostContentText(val);
          detectLinks(postContentText)
        }}
      />
      <View>
        {selectedMedia ? (
          selectedMedia?.length > 1 ? (
            <LMCarousel attachments={convertData(selectedMedia)} showCancel onCancel={(index) => remove(index)} />
          ) : (
            <>
              {convertData(selectedMedia)[0]?.attachmentMeta.format ===
                'image/jpg' && (
                <LMImage
                  imageUrl={`${
                    convertData(selectedMedia)[0]?.attachmentMeta.url
                  }`}
                />
              )}
              {convertData(selectedMedia)[0]?.attachmentMeta.format ===
                'video/mp4' && (
                // <Text>video</Text>
                <LMVideo
                  videoUrl={`${
                    convertData(selectedMedia)[0]?.attachmentMeta.url
                  }`}
                />
              )}
            </>
          )
        ) : null}
        {selectedDocMedia.length >= 1 && (
          <LMDocument attachments={convertDocData(selectedDocMedia)} showCancel onCancel={(index) => remove(index)} />
        )}
        {
          // addedLink && <LMLinkPreview attachments={convertLinkData(addedLink)} />
        }
      </View>
      {(selectedMedia.length > 0 || selectedDocMedia.length > 0) && (
        <LMButton
          onTap={selectedMedia.length > 0 ? () => handleGallery('mixed') : selectedDocMedia.length > 0 ? () => handleDoc() : () => {}}
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
      {showOptions && (
        <View
          style={{position: 'absolute', bottom: 0, width: Layout.window.width}}>
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
