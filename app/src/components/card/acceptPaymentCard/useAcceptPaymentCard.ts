import constant from '@config/constant';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from '@utility/snackbar';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Alert, Share} from 'react-native';
import {FlatListProps} from './acceptPaymentCardProps';
import Log from '@utility/log';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {axiosInstance} from '@api/api';
import {useAppSelector} from '@utility/useReduxHooks';

const useAcceptPaymentCard = ({onCancelClick}: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [sourceAccount, setSourceAccount] = useState<string>('');
  const navigation = useNavigation<AuthNavigationProps>();
  const [transactionDate, setTransactionDate] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {token} = useAppSelector(state => state.userReducer);
  const onClickCopy = (link: string) => {
    Clipboard.setString(link);
    Snackbar('Copied to clipboard');
  };

  const confirmCancel = (id?: string) => {
    Alert.alert('Cancel Payment', 'Are you sure want to Cancel Payment ?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Confirm',
        onPress: () => cancelPayment(id),
        style: 'destructive',
      },
    ]);
  };

  const cancelPayment = async (id?: string) => {
    setLoading(true);
    try {
      let formData = {
        id: id,
      };
      const {data} = await axiosInstance.post(
        constant.cancelPayment,
        formData,
        {
          headers: {
            auth: token,
          },
        },
      );
      setTimeout(() => {
        setLoading(false);
        setIsVisible(!isVisible);
        Snackbar(data?.message);
      }, 500);
      onCancelClick();
    } catch (error) {
      setLoading(false);
    }
  };
  const getSourceAccount = async (transactionId?: string) => {
    setLoader(true);
    try {
      const {data} = await axios.get(
        `${constant.getStellarTransaction}${transactionId}`,
      );
      setLoader(false);
      setSourceAccount(data?.source_account);
      setTransactionDate(data?.created_at);
    } catch (error) {
      Log('error transaction::::', error);
      setLoader(false);
    }
  };
  const onClickShare = (link: string) => {
    Share.share({
      message: link,
    });
  };
  const onTransaction = (item: FlatListProps) => {
    setIsVisible(!isVisible);
    if (item?.status == 'Completed') {
      getSourceAccount(item?.transactionID);
    }
  };
  const viewStellar = (item: FlatListProps) => {
    setIsVisible(false);
    setTimeout(() => {
      navigation.navigate('webViewScreen', {
        title: 'Transaction Detail',
        link: `${constant.transactionUrl}${item.transactionID}`,
      });
    }, 300);
  };
  return {
    onClickCopy,
    onClickShare,
    isVisible,
    setIsVisible,
    sourceAccount,
    onTransaction,
    loader,
    transactionDate,
    viewStellar,
    confirmCancel,
    loading,
  };
};

export default useAcceptPaymentCard;
