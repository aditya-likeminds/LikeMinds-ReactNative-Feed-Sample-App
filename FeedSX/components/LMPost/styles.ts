import { Platform, StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import STYLES from '../../constants/Styles';

const styles = StyleSheet.create({
    mainContainer: {
        width: Layout.window.width,
        backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    },
    postDescription: {
        width: '100%',
    }
});

export default styles;
