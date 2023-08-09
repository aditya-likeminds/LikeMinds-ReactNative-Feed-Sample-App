import { StyleSheet } from 'react-native';
import STYLES from '../../../constants/Styles';

const styles = StyleSheet.create({
    postFooter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: STYLES.$PADDINGS.MEDIUM,
        paddingVertical: STYLES.$PADDINGS.SMALL
    },
    alignRow: {
        flexDirection: 'row',
        alignItems:"center"
    },
    postFooterText: {
        fontSize: STYLES.$FONT_SIZES.LARGE,
        fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
        color: STYLES.$COLORS.darkTextColor,
        marginLeft: 8,
    }
});

export default styles;
