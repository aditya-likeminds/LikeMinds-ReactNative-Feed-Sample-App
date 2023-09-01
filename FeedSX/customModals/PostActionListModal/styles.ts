import {Platform, StyleSheet} from 'react-native';
import STYLES from '../../constants/Styles';

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    elevation: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    minWidth: '55%',
    position: 'absolute',
    right: 15,
  },
  listText: {
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontWeight: STYLES.$FONT_WEIGHTS.REGULAR,
    color: STYLES.$COLORS.darkTextColor,
    marginVertical: 12,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
});
