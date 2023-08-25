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
        backgroundColor:'red'
    }
});

export default styles;