import {StyleSheet} from 'react-native';
import STYLES from '../../constants/Styles';

const styles = StyleSheet.create({
  avatarView: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameInitialView: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#5046E5',
    alignItems: 'center',
    borderRadius: 100,
  },
  nameInitialText: {
    color: STYLES.$COLORS.whiteTextColor,
    fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
    fontSize: STYLES.$FONT_SIZES.XL,
    fontFamily: STYLES.$FONT_FAMILY.MEDIUM,
  },
});

export default styles;
