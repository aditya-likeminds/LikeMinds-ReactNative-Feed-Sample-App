import {View, Text, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useAppSelector} from '../../store/store';
import {useDispatch} from 'react-redux';
import {showToastMessage} from '../../store/actions/toast';

const LMToast = () => {
  const dispatch = useDispatch();
  const {isToast, message} = useAppSelector(state => state.loader);

  // this function dismiss the toast message
  const onDismiss = () => {
    dispatch(showToastMessage({isToast: false, message: ''}) as any);
  };

  // this handles the visibilty of toast message
  useEffect(() => {
    if (!!isToast) {
      setTimeout(() => {
        onDismiss();
      }, 2000);
    }
  }, [isToast]);

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isToast}
        onRequestClose={() => {
          onDismiss();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalParent}>
            <View style={styles.modalView}>
              <Text style={styles.filterText}>{message}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LMToast;
