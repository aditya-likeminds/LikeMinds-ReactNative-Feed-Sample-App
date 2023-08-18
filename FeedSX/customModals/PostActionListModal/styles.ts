import {Platform, StyleSheet} from 'react-native';
import STYLES from '../../constants/Styles';

export const styles = StyleSheet.create({
    listText: {
        fontSize:STYLES.$FONT_SIZES.LARGE,
        fontWeight:STYLES.$FONT_WEIGHTS.REGULAR,
        color: STYLES.$COLORS.darkTextColor,
        marginVertical:12
    }
});
