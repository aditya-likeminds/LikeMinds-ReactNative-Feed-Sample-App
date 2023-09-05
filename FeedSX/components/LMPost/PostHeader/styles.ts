import { Platform, StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import STYLES from '../../../constants/Styles';

const styles = StyleSheet.create({
    postHeader: {
        width: '100%',
        paddingHorizontal: STYLES.$PADDINGS.MEDIUM,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    alignRow: {
        flexDirection: 'row',
        alignItems:"center"
    },
    postAuthorName: {
        color: STYLES.$COLORS.darkTextColor,
        fontSize: STYLES.$FONT_SIZES.XL,
        fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
        fontFamily: STYLES.$FONT_FAMILY.REGULAR
    },
    postedDetail:{
        color: STYLES.$COLORS.lightGreyTextColor,
        fontSize: STYLES.$FONT_SIZES.MEDIUM,
        fontFamily: STYLES.$FONT_FAMILY.REGULAR
    },
    labelText:{
        color: STYLES.$COLORS.whiteTextColor,
        fontSize: STYLES.$FONT_SIZES.MEDIUM,
        fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
        fontFamily: STYLES.$FONT_FAMILY.REGULAR
    },
    labelView: {
        backgroundColor: '#5046E5',
        marginLeft: STYLES.$MARGINS.SMALL,
        paddingHorizontal: STYLES.$PADDINGS.SMALL,
        paddingVertical: 2,
        borderRadius: 5 
    },
    iconSize: {
        width:Layout.normalize(22),
        height:Layout.normalize(22)
    },
    dotImageSize: {
        width:Layout.normalize(6),
        height:Layout.normalize(6),
        marginHorizontal:STYLES.$MARGINS.XS
    },
    topRightView:{
        width: '20%',
        flexDirection:'row',
        marginTop: STYLES.$MARGINS.XS,
        justifyContent:'flex-end'
    }
});

export default styles;
