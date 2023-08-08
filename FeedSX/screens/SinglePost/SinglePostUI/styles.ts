import { Platform, StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import STYLES from '../../../constants/Styles';

const styles = StyleSheet.create({
    mainContainer: {
        width: Layout.window.width,
        backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    },
    postHeader: {
        width: '100%',
        height: 40,
        backgroundColor: 'red'
    },
    postDescription: {
        width: '100%',
        height: 40,
        backgroundColor: 'green'
    },
    postMedia: {
        width: '100%', height: 40, backgroundColor: 'yellow'
    },
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
