import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '@utility/useReduxHooks';
import {kycSuccess} from '@redux/user/userSlice';

const onfidoController = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'onfidoVerify'>>();
  const userId = route?.params?.userId;
  const dispatch = useAppDispatch();

  const onStateChange = (url: string) => {
    if (url.includes('success')) {
      dispatch(kycSuccess('Pending'));
      navigation.navigate('kyb');
    }
  };

  return {
    onStateChange,
    userId,
  };
};

export default onfidoController;
