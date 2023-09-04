import { Platform, StyleSheet } from 'react-native';
import STYLES from '../../../constants/Styles';

const styles = StyleSheet.create({
    postDescription: {
        width: '100%',
        paddingHorizontal: STYLES.$PADDINGS.MEDIUM,
        paddingVertical: STYLES.$PADDINGS.SMALL
    },
    contentText:{
        fontSize:STYLES.$FONT_SIZES.LARGE,
        color: STYLES.$COLORS.postDescriptionTextColor
    },
    linkText:{
        color:'blue'
    }
});

export default styles;
