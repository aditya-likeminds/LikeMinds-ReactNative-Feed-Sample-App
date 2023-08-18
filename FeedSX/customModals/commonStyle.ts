import {Platform, StyleSheet} from 'react-native';
import STYLES from '../constants/Styles';

export const commonStyles = StyleSheet.create({
  // Modal design
  modal: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    elevation:8,
    paddingHorizontal: 18,
    paddingVertical:12,
    minWidth: '55%',
    position:'absolute',
    right:15
  }
});
