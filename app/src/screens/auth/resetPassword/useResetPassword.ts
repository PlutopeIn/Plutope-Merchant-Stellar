import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {errorProps, userInputProps} from './resetPasswordProps';
import {checkPassword} from '@utility/validation/validation';
import validationMessage from '@utility/validation/validationMessage';
import Snackbar from '@utility/snackbar';
import Log from '@utility/log';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import params from '@config/params';
import {useResettableState} from '@hooks/useResettableState';

const useResetPassword = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'resetPassword'>>();
  const [userInput, setUserInput, resetState] =
    useResettableState<userInputProps>({
      password: '',
      confirmPassword: '',
      loading: false,
    });
  const [errorObject, setErrorObject] = useState<errorProps>({
    passwordError: undefined,
    confirmPasswordError: undefined,
  });

  const validation = () => {
    let isValid = true;
    if (!userInput?.password) {
      isValid = false;
      errorObject.passwordError = validationMessage.emptyPassword;
    } else if (!checkPassword(userInput?.password)) {
      isValid = false;
      errorObject.passwordError = validationMessage.invalidPassword;
    } else {
      errorObject.passwordError = '';
    }
    if (!userInput?.confirmPassword) {
      isValid = false;
      errorObject.confirmPasswordError =
        validationMessage.emptyConfirmNewPassword;
    } else if (userInput?.confirmPassword !== userInput?.password) {
      isValid = false;
      errorObject.confirmPasswordError =
        validationMessage.confirmNewPasswordMatch;
    } else {
      errorObject.confirmPasswordError = '';
    }
    setErrorObject({...errorObject});
    if (isValid) {
      resetPasswordApiCall();
    }
  };

  const resetPasswordApiCall = async () => {
    // #region Start integrating resetPassword api
    setUserInput('loading', true);
    const formData = {
      [params.id]: route?.params?.id,
      [params.newPassword]: userInput?.password,
    };
    try {
      const {data} = await axiosInstance.post(constant.resetPassword, formData);
      Log('resetPassword response', JSON.stringify(data));
      Snackbar(data?.message);
      resetState();
      navigation.navigate('login');
    } catch (e: any) {
      setUserInput('loading', false);
      Snackbar(e?.data?.message);
      Log('resetPassword error', e);
    }
    // End integrating resetPassword api
  };

  return {userInput, setUserInput, errorObject, validation};
};

export default useResetPassword;
