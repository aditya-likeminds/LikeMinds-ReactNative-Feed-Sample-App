import { StyleSheet } from 'react-native';
import STYLES from '../../../constants/Styles';
import Layout from '../../../constants/Layout';

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
    },
    likeIconSize: {
        width:Layout.normalize(25),
        height:Layout.normalize(25)
    },
    commentIconSize:{
        width:Layout.normalize(21),
        height:Layout.normalize(21)
    },
    iconSize: {
        width:Layout.normalize(22),
        height:Layout.normalize(22)
    }
});

export default styles;
