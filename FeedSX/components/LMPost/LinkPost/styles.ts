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
        marginTop: STYLES.$MARGINS.MEDIUM,
        marginBottom: STYLES.$MARGINS.XS,
        overflow: 'hidden'
    },
});

export default styles;
