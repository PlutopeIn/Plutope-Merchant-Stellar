import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import Snackbar from '@utility/snackbar';
import Log from '@utility/log';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '@utility/useReduxHooks';
import {kybSuccess, kycSuccess, navigationStep} from '@redux/user/userSlice';

const kybProcessController = () => {
  const dispatch = useAppDispatch();
  const {signupDetails, kybStatus, kycStatus} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const navigation = useNavigation<AuthNavigationProps>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (kybStatus && kycStatus) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [kybStatus, kycStatus]);

  const onRefreshCall = () => {
    if (kybStatus && kycStatus) {
      kybKycStatusApiCall();
    }
  };

  const kybKycStatusApiCall = async () => {
    // #region Start integrating kybKycStatus api
    setRefreshing(true);
    const formData = {
      [params.userId]: signupDetails?._id,
    };
    try {
      const {data} = await axiosInstance.post(
        constant.getKybKycStatus,
        formData,
      );
      Log('kybKycStatus response', JSON.stringify(data));
      dispatch(kybSuccess(data?.data?.kybDetails?.kybStatus));
      dispatch(kycSuccess(data?.data?.kycDetails?.kycStatus));
      setRefreshing(false);
    } catch (e: any) {
      setRefreshing(false);
      Snackbar(e?.data?.message);
      Log('kybKycStatus error', e);
    }
    // End integrating kybKycStatus api
  };

  const onKyb = () => {
    navigation.navigate('kyb', {kybKycStatusApiCall});
  };

  const onKyc = () => {
    navigation.navigate('kyc', {kybKycStatusApiCall});
  };

  const onUpdate = () => {
    dispatch(navigationStep(undefined));
    navigation.replace('drawer');
  };

  return {
    onKyb,
    onKyc,
    onUpdate,
    disabled,
    kybStatus,
    kycStatus,
    refreshing,
    onRefreshCall,
  };
};

export default kybProcessController;
