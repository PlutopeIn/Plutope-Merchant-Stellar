import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {errorProps, userSignupProps} from './signUpProps';
import {getExampleNumber} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import validationMessage from '@utility/validation/validationMessage';
import {
  checkEmail,
  checkMobileNumber,
  checkName,
  checkPassword,
} from '@utility/validation/validation';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import Snackbar from '@utility/snackbar';
import Log from '@utility/log';
import {useAppDispatch} from '@utility/useReduxHooks';
import {signupStepSuccess} from '@redux/user/userSlice';
import {useResettableState} from '@hooks/useResettableState';

const useSignUp = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProps>();
  const [userSignUp, setUserSignUp, resetState] =
    useResettableState<userSignupProps>({
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      selectCountryCode: '+91',
      mobileLength: 10,
      loading: false,
    });
  const [errorObject, setErrorObject] = useState<errorProps>({
    firstNameError: undefined,
    lastNameError: undefined,
    emailError: undefined,
    mobileError: undefined,
    passwordError: undefined,
    confirmPasswordError: undefined,
  });

  const validation = (): void => {
    let isValid = true;
    if (!userSignUp?.email) {
      isValid = false;
      errorObject.emailError = validationMessage.emptyEmail;
    } else if (!checkEmail(userSignUp?.email)) {
      isValid = false;
      errorObject.emailError = validationMessage.invalidEmail;
    } else {
      errorObject.emailError = '';
    }
    if (!userSignUp?.password) {
      isValid = false;
      errorObject.passwordError = validationMessage.emptyPassword;
    } else if (!checkPassword(userSignUp?.password)) {
      isValid = false;
      errorObject.passwordError = validationMessage.invalidPassword;
    } else {
      errorObject.passwordError = '';
    }
    if (!userSignUp?.confirmPassword) {
      isValid = false;
      errorObject.confirmPasswordError = validationMessage.emptyConfirmPassword;
    } else if (userSignUp?.confirmPassword !== userSignUp?.password) {
      isValid = false;
      errorObject.confirmPasswordError = validationMessage.confirmPasswordMatch;
    } else {
      errorObject.confirmPasswordError = '';
    }
    // if (!userSignUp?.mobileNumber) {
    //   isValid = false;
    //   errorObject.mobileError = validationMessage.emptyMobile;
    // } else if (
    //   userSignUp?.selectCountryCode === '+91' &&
    //   !checkMobileNumber(userSignUp?.mobileNumber)
    // ) {
    //   isValid = false;
    //   errorObject.mobileError = validationMessage.invalidMobile;
    // } else if (userSignUp?.mobileNumber.length != userSignUp?.mobileLength) {
    //   isValid = false;
    //   errorObject.mobileError = validationMessage.invalidMobile;
    // } else {
    //   errorObject.mobileError = '';
    // }
    setErrorObject({...errorObject});
    if (isValid) {
      signupApiCall();
    }
  };

  const signupApiCall = async () => {
    // #region Start integrating signup api
    setUserSignUp('loading', true);
    const formData = {
      [params.email]: userSignUp?.email,
      [params.password]: userSignUp?.password,
      [params.confirmPassword]: userSignUp?.confirmPassword,
      // [params.countryCode]: userSignUp?.selectCountryCode,
      // [params.mobile]: userSignUp?.mobileNumber,
    };
    try {
      const {data} = await axiosInstance.post(constant.register, formData);
      Log('signup response', JSON.stringify(data));
      Snackbar(data?.message);
      dispatch(signupStepSuccess(data?.data));
      resetState();
      navigation.navigate('verifyOtp', {
        screen: 'signUp',
        email: userSignUp?.email,
      });
    } catch (e: any) {
      setUserSignUp('loading', false);
      Snackbar(e?.data?.message);
      Log('signup error', e);
    }
    // #region End integrating signup api
  };

  const onSelectCountryCode = (item: any) => {
    const lengthOfNumber: any = getExampleNumber(item.country_code, examples);
    setUserSignUp('mobileLength', lengthOfNumber?.nationalNumber?.length);
    setUserSignUp('selectCountryCode', item?.dialling_code);
  };

  const onHandleClick = (flag: number) => {
    if (flag == 1) {
      navigation.navigate('cmsDetail', {
        title: 'Terms & Conditions',
        screen: 'Terms',
      });
    } else {
      navigation.navigate('cmsDetail', {
        title: 'Privacy Policy',
        screen: 'Privacy',
      });
    }
  };

  return {
    validation,
    errorObject,
    userSignUp,
    setUserSignUp,
    onSelectCountryCode,
    onHandleClick,
  };
};

export default useSignUp;
