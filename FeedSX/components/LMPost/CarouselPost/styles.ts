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
        backgroundColor:'black'
    },
    swiperView: {
        marginBottom: STYLES.$MARGINS.XXL
    },
    paginationView: {
        position: 'absolute',
        bottom: -STYLES.$MARGINS.XS
    },
    paginationItemStyle: {
        width: 8,
        height: 8,
        marginHorizontal: 4,
    }
});

export default styles;
