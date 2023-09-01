import { StyleSheet } from 'react-native';
import STYLES from '../../../constants/Styles';

const styles = StyleSheet.create({
    postDescription: {
        width: '100%',
        paddingHorizontal: STYLES.$PADDINGS.MEDIUM,
        paddingTop: STYLES.$PADDINGS.SMALL
    },
    contentText:{
        fontSize:STYLES.$FONT_SIZES.LARGE,
        color: STYLES.$COLORS.postDescriptionTextColor,
        fontFamily: STYLES.$FONT_FAMILY.REGULAR,
    },
    linkText:{
        color:'#007AFF',
        fontFamily: STYLES.$FONT_FAMILY.REGULAR
    }
});

export default styles;
