import { Platform, StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import STYLES from '../../constants/Styles';

const styles = StyleSheet.create({
    mainContainer: {
        width: Layout.window.width,
        backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    },
    postHeader: {
        width: '100%',
        paddingHorizontal: STYLES.$PADDINGS.MEDIUM,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    postDescription: {
        width: '100%',
    },
    postMedia: {
        width: '100%',
    }
});

export default styles;
