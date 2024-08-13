import {View, Text} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import constant from '@config/constant';

const useTransactionDetail = () => {
  const route = useRoute<RouteProp<AuthParams, 'transactionDetail'>>();
  const detail = route?.params?.details;
  const navigation = useNavigation<AuthNavigationProps>();
  const viewStellar = (item: NotificationListProps) => {
    navigation.navigate('webViewScreen', {
      title: 'Transaction Detail',
      link: `${constant.transactionUrl}${item.transactionHash}`, // https://stellar.expert/explorer/${constant.mode}/tx/${item?.transactionHash}
    });
  };
  return {detail, viewStellar};
};

export default useTransactionDetail;
