import {useResettableState} from '@hooks/useResettableState';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {acceptPaymentProps} from './acceptPaymentProps';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import Log from '@utility/log';
import {useEffect} from 'react';
import Snackbar from '@utility/snackbar';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import {Alert} from 'react-native';

const useAcceptPaymentController = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const isFocused = useIsFocused();
  const {token} = useSelector((state: RootState) => state.userReducer);
  const [acceptPayment, setAcceptPayment, resetState, updateState] =
    useResettableState<acceptPaymentProps>({
      data: [],
      loading: true,
      refreshing: false,
      activeTab: 1,
      filterData: [],
    });

  useEffect(() => {
    if (isFocused) {
      fetchPaymentRequest();
    }
  }, [isFocused]);

  useEffect(() => {
    if (acceptPayment?.filterData?.length != 0) {
      switch (acceptPayment.activeTab) {
        case 1:
          updateState({
            ...acceptPayment,
            data: acceptPayment?.filterData,
          });
          break;
        case 2:
          const completedFilter = acceptPayment?.filterData?.filter(
            item => item.status == 'Completed',
          );
          updateState({...acceptPayment, data: completedFilter});
          break;
        case 3:
          const pendingFilter = acceptPayment?.filterData?.filter(
            item => item.status == 'Pending',
          );
          updateState({...acceptPayment, data: pendingFilter});
          break;
        case 4:
          const cancelFilter = acceptPayment?.filterData?.filter(
            item => item.status == 'Cancelled',
          );
          updateState({...acceptPayment, data: cancelFilter});
          break;

        default:
          break;
      }
    }
  }, [acceptPayment.activeTab, acceptPayment?.filterData]);

  const refreshCall = () => {
    setAcceptPayment('refreshing', true);
    fetchPaymentRequest();
  };

  const onClickAdd = () => {
    navigation.navigate('requestPayment');
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
  const changeTab = (tabIndex: number) => {
    setAcceptPayment('activeTab', tabIndex);
  };
  const cancelPayment = async (id?: string) => {
    setAcceptPayment('loading', true);
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
      setAcceptPayment('loading', false);
      Snackbar(data?.message);
      fetchPaymentRequest();
    } catch (error) {
      setAcceptPayment('loading', false);
    }
  };
  const refreshAfterCancel = () => {
    fetchPaymentRequest();
  };
  const fetchPaymentRequest = async () => {
    // #region Start integrating fetchPaymentRequest api
    try {
      const {data} = await axiosInstance.get(
        constant.getRequestPaymentDetails,
        {
          headers: {
            auth: token,
          },
        },
      );
      setAcceptPayment('loading', false);
      Log('fetchAllAssets success', JSON.stringify(data));
      setAcceptPayment('data', data?.data);
      setAcceptPayment('filterData', data?.data);
    } catch (e: any) {
      setAcceptPayment('loading', false);
      setAcceptPayment('refreshing', false);
      Snackbar(e?.data?.message);
      Log('fetchAllAssets error', e);
    }
    // #region End integrating fetchPaymentRequest api
  };

  return {
    acceptPayment,
    refreshCall,
    onClickAdd,
    confirmCancel,
    changeTab,
    refreshAfterCancel,
  };
};

export default useAcceptPaymentController;
