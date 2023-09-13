import { Platform, StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import STYLES from '../../../constants/Styles';

const styles = StyleSheet.create({
    postMedia: {
        width: '100%',
    },
    mediaDimensions:{
        width: Layout.window.width,
        height: 325,
        backgroundColor: STYLES.$BACKGROUND_COLORS.DARK
    },
    loaderView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    }
});

export default styles;