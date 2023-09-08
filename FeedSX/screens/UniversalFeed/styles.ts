import {StyleSheet} from 'react-native';
import Layout from '../../constants/Layout';
import STYLES from '../../constants/Styles';

export const styles = StyleSheet.create({
  newPostButtonView: {
    backgroundColor: '#5046E5',
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    padding: STYLES.$PADDINGS.SMALL,
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    top: Layout.window.height - 150,
    right: 20,
  },
  newPostText: {
    fontSize: 15,
    fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
    color: STYLES.$COLORS.whiteTextColor,
    fontFamily: STYLES.$FONT_FAMILY.BOLD,
    marginLeft: STYLES.$MARGINS.SMALL,
  },
});
