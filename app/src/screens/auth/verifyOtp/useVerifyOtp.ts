import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {Keyboard, ScrollView, TextInput} from 'react-native';
import {ErrorObject, verifyOTPProps} from './verifyOtpProps';
import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import validationMessage from '@utility/validation/validationMessage';
import Log from '@utility/log';
import Snackbar from '@utility/snackbar';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import BackgroundTimer from 'react-native-background-timer';
import {useResettableState} from '@hooks/useResettableState';
import {useAppDispatch} from '@utility/useReduxHooks';
import {navigationStep} from '@redux/user/userSlice';
import {generateMnemonic} from '@coingrig/wallet-generator';

const useVerifyOtp = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'verifyOtp'>>();
  const [verifyOTP, setVerifyOTP, resetState] =
    useResettableState<verifyOTPProps>({
      otpCode: '',
      loading: false,
    });
  const scrollViewRef = useRef<ScrollView>(null);
  const [timer, setTimer] = useState(59);
  const refOtp = useRef<TextInput>(null);
  const [errorObject, setErrorObject] = useState<ErrorObject>({
    mobileOtpError: undefined,
  });

  useEffect(() => {
    let timerX = BackgroundTimer.setTimeout(() => {
      if (timer != 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => {
      BackgroundTimer.clearInterval(timerX);
    };
  }, [timer]);

  const validationVerifyOtp = () => {
    //* validation Verify Otp function /
    let isValidate = true;
    if (!verifyOTP?.otpCode) {
      isValidate = false;
      errorObject.mobileOtpError = validationMessage.emptyOTP;
    } else if (verifyOTP?.otpCode?.length !== 4) {
      isValidate = false;
      errorObject.mobileOtpError = validationMessage.invalidOTP;
    } else {
      errorObject.mobileOtpError = undefined;
    }
    setErrorObject({...errorObject});
    if (isValidate) {
      verifyOtpApiCall();
    }
  };

  const verifyOtpApiCall = async () => {
    // #region Start integrating verifyOtp api
    setVerifyOTP('loading', true);
    const formData = {
      [params.email]: route?.params?.email,
      [params.otp]: verifyOTP?.otpCode,
    };
    try {
      const {data} = await axiosInstance.post(constant.verifyOtp, formData);
      Log('verifyOtp response', JSON.stringify(data));
      Snackbar(data?.message);
      if (route?.params?.screen == 'signUp') {
        dispatch(navigationStep('2'));
        generateMnemonic(12)
          .then(res => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'setStore',
                },
              ],
            });
          })
          .catch(e => Log('generate Mnemonic Error', e));
      } else {
        navigation.replace('resetPassword', {id: data?.data?._id});
      }
      resetState();
      BackgroundTimer.clearInterval(timer);
    } catch (e: any) {
      setVerifyOTP('loading', false);
      Snackbar(e?.data?.message);
      Log('verifyOtp error', e);
    }
    // End integrating verifyOtp api
  };

  /** Api call for Resend OTP */
  const onResendOtpCall = async () => {
    // #region Start integrating resendOtp api
    Keyboard.dismiss();
    setVerifyOTP('otpCode', '');
    setTimer(59);
    const formData = {
      [params.email]: route?.params?.email,
    };
    try {
      const {data} = await axiosInstance.post(constant.resendOtp, formData);
      Log('resendOtp response', JSON.stringify(data));
      Snackbar(data?.message);
    } catch (e: any) {
      Snackbar(e?.data?.message);
      Log('resendOtp error', e);
      // End integrating resendOtp api
    }
  };

  return {
    validationVerifyOtp,
    onResendOtpCall,
    verifyOTP,
    scrollViewRef,
    refOtp,
    setVerifyOTP,
    errorObject,
    timer,
    route,
  };
};

export default useVerifyOtp;
