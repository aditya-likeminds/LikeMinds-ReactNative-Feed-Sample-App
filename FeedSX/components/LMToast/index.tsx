import {View, Text, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useAppSelector} from '../../store/store';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { showToastMessage } from '../../store/actions/toast';

const LMToast = () => {
const dispatch = useDispatch();
  const {isToast, message} = useAppSelector(state => state.loader);
  useEffect(() =>{
    showToast()
  },[])

  const showToast = () => {
    Toast.show({
      position:'bottom',
      type: 'tomatoToast',
      autoHide:true,
      visibilityTime: 1500,
      onHide: () => dispatch( showToastMessage({
        isToast: false,
     }) as any,)
    },
    );
  }



  const toastConfig = {
   
    tomatoToast: () => (
        <View>
          <View>
            <View style={styles.modalView}>
              <Text style={styles.filterText}>{message}</Text>
            </View>
          </View>
        </View>
    )
  };

  return (
    <>
  <Toast config={toastConfig} />
    </>
    
  );
};

export default LMToast;
