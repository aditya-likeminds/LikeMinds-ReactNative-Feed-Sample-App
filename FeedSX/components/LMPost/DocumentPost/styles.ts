import { Platform, StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import STYLES from '../../../constants/Styles';

const styles = StyleSheet.create({
    postMedia: {
        width: '100%',
    },
    docView:{
        flexDirection:'row',
        borderColor: STYLES.$BORDER_COLORS.LIGHT,
        borderWidth:1,
        marginHorizontal:STYLES.$MARGINS.MEDIUM,
        borderRadius:5,
        paddingVertical:12,
        paddingHorizontal:STYLES.$PADDINGS.MEDIUM,
        marginVertical:STYLES.$MARGINS.SMALL
    },
    pdfIcon:{
        width:50,
        height:50
    },
    alignRow: {
        flexDirection: 'row',
        alignItems:"center"
    },
    docTitle: {
        color: STYLES.$COLORS.darkGreyTextColor,
        fontSize: STYLES.$FONT_SIZES.XL,
        fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
        fontFamily: STYLES.$FONT_FAMILY.REGULAR
    },
    docDetail:{
        color: STYLES.$COLORS.lightGreyTextColor,
        fontSize: STYLES.$FONT_SIZES.MEDIUM,
        fontFamily: STYLES.$FONT_FAMILY.REGULAR
    },
    dotImageSize: {
        width:Layout.normalize(6),
        height:Layout.normalize(6),
        marginHorizontal:STYLES.$MARGINS.XS
    },
});

export default styles;
