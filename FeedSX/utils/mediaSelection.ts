import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch } from 'react-redux';
import { showToastMessage } from '../store/actions/toast';

const MAX_FILE_SIZE = 104857600; // 100MB in bytes
const MIN_FILE_SIZE = 100000; // 100KB in bytes

// const dispatch = useDispatch()

//select Images and videoes From Gallery
export const selectImageVideo = async (type: string) => {
  const options = {
    mediaType: type,
    selectionLimit: 0,
  };
  return await launchImageLibrary(options as any, async (response: any) => {
    if (response?.didCancel) {
      // process cancel
    }
    let selectedImages = response?.assets; // selectedImages can be anything images or videos or both

    // for (let i = 0; i < selectedImages?.length; i++) {
    //   if (selectedImages[i].fileSize >= MAX_FILE_SIZE || selectedImages[i].fileSize <= MIN_FILE_SIZE) {
    //     // dispatch(
    //     //   showToastMessage({
    //     //     isToast: true,
    //     //     message: 'Files below 100 KB and above 100MB are not allowed',
    //     //   }) as any,
    //     // );
    //     return;
    //   }
    // }
    if (!!selectedImages) {
      return;
    }
  });
};

//select Documents From Gallery
export const selectDoc = async () => {
  try {
    const response = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
      allowMultiSelection: true,
    });
    let selectedDocs: any = response; // selectedImages can be anything images or videos or both
    let docsArrlength = selectedDocs?.length;
    if (docsArrlength > 0) {
      for (let i = 0; i < docsArrlength; i++) {
        if (selectedDocs[i].size >= MAX_FILE_SIZE || selectedDocs[i] <= MIN_FILE_SIZE) {
          // dispatch(
          //   showToastMessage({
          //     isToast: true,
          //     message: 'Files below 100 KB and above 100MB are not allowed',
          //   }) as any,
          // );
          return;
        }
      }
      if (!!selectedDocs) {
        return selectedDocs;
      }
    }
  } catch (error) {
    // process error
  }
};
