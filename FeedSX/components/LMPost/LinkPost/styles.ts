import { Platform, StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import STYLES from '../../../constants/Styles';

const styles = StyleSheet.create({
    postMedia: {
        width: '100%',
        paddingHorizontal:15
    },
    previewContainer: {
        borderColor: STYLES.$BORDER_COLORS.LIGHT,
        borderWidth:0.5,
        borderRadius: 10,
        marginTop: STYLES.$MARGINS.SMALL,
        marginBottom: STYLES.$MARGINS.XS,
    },
    previewImage: {
        width:'100%',
        height:220,
        borderTopLeftRadius:7,
        borderTopRightRadius:7
    },
    previewTitle: {
        fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
        color:'#484F67',
        fontSize:16,
        fontFamily: STYLES.$FONT_FAMILY.MEDIUM
    },
    previewDescription: {
        color:'#484F6799',
        paddingVertical:2,
        fontFamily: STYLES.$FONT_FAMILY.REGULAR
    },
    previewLink: {
        color:'#484F6799',
        fontSize:12,
        fontFamily: STYLES.$FONT_FAMILY.REGULAR
    }
});

export default styles;
