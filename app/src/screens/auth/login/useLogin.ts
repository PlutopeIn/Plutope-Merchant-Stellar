import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import validationMessage from '@utility/validation/validationMessage';
import {checkEmail, checkPassword} from '@utility/validation/validation';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import Log from '@utility/log';
import Snackbar from '@utility/snackbar';
import {loginSuccess, walletPrivateDataSuccess} from '@redux/user/userSlice';
import {useAppDispatch} from '@utility/useReduxHooks';
import {useResettableState} from '@hooks/useResettableState';
import {ErrorProps, userLoginProps} from './loginProps';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProps>();
  const [userLogin, setUserLogin, resetState] =
    useResettableState<userLoginProps>({
      email: '',
      password: '',
      loading: false,
    });
  const [errorObject, setErrorObject, resetError, updateError] =
    useResettableState<ErrorProps>({
      emailError: undefined,
      passwordError: undefined,
    });

  const validation = (): void => {
    let isValid = true;
    if (!userLogin?.email) {
      isValid = false;
      errorObject.emailError = validationMessage.emptyEmail;
    } else if (!checkEmail(userLogin?.email)) {
      isValid = false;
      errorObject.emailError = validationMessage.invalidEmail;
    } else {
      errorObject.emailError = '';
    }
    if (!userLogin?.password) {
      isValid = false;
      errorObject.passwordError = validationMessage.emptyPassword;
    } else if (!checkPassword(userLogin?.password)) {
      isValid = false;
      errorObject.passwordError = validationMessage.invalidPassword;
    } else {
      errorObject.passwordError = '';
    }
    updateError({...errorObject});
    if (isValid) {
      loginApiCall();
    }
  };

  const loginApiCall = async () => {
    // #region Start integrating login api
    setUserLogin('loading', true);
    const formData = {
      [params.email]: userLogin?.email?.toLowerCase(),
      [params.password]: userLogin?.password,
    };
    try {
      const {data} = await axiosInstance.post(constant.login, formData);
      Log('login response', JSON.stringify(data));
      decryptKey(data?.data?.getUser);
      Snackbar(data?.message);
      dispatch(loginSuccess(data?.data));
    } catch (e: any) {
      setUserLogin('loading', false);
      Snackbar(e?.data?.message);
      Log('login error', e);
    }
    // End integrating login api
  };

  const decryptKey = async (keys: any) => {
    // #region Start integrating decryptKey api
    const formData = {
      [params.secretKey]: keys?.secretKey,
    };
    try {
      const {data} = await axiosInstance.post(constant.getDecryptKey, formData);
      const walletData = {
        publicKey: keys?.publicKey,
        secretKey: data?.data,
      };
      Log('decryptKey success', JSON.stringify(data));
      dispatch(walletPrivateDataSuccess(walletData));
      resetState();
      navigation.reset({
        index: 0,
        routes: [{name: 'drawer'}],
      });
    } catch (e: any) {
      setUserLogin('loading', false);
      Log('decryptKey error', e);
    }
    // #region End integrating decryptKey api
  };

  const onSignupClick = () => {
    resetState();
    resetError();
    navigation.navigate('signUp');
  };

  const onForgotPassword = () => {
    resetState();
    resetError();
    navigation.navigate('forgotPassword');
  };

  return {
    validation,
    errorObject,
    onSignupClick,
    userLogin,
    setUserLogin,
    onForgotPassword,
  };
};

export default useLogin;
