import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {errorProps, userInputProps} from './forgotPasswordProps';
import {checkEmail} from '@utility/validation/validation';
import validationMessage from '@utility/validation/validationMessage';
import Snackbar from '@utility/snackbar';
import Log from '@utility/log';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import params from '@config/params';
import {useResettableState} from '@hooks/useResettableState';

const useForgotPassword = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const [userInput, setUserInput, resetState] =
    useResettableState<userInputProps>({
      email: '',
      loading: false,
    });
  const [errorObject, setErrorObject] = useState<errorProps>({
    emailError: undefined,
  });

  const validation = (): void => {
    let isValid = true;
    if (!userInput?.email) {
      isValid = false;
      errorObject.emailError = validationMessage.emptyEmail;
    } else if (!checkEmail(userInput?.email)) {
      isValid = false;
      errorObject.emailError = validationMessage.invalidEmail;
    } else {
      errorObject.emailError = '';
    }
    setErrorObject({...errorObject});
    if (isValid) {
      forgotPasswordApiCall();
    }
  };

  const forgotPasswordApiCall = async () => {
    // #region Start integrating forgotPassword api
    setUserInput('loading', true);
    const formData = {
      [params.email]: userInput?.email,
    };
    try {
      const {data} = await axiosInstance.post(
        constant.forgotPassword,
        formData,
      );
      Log('forgotPassword response', JSON.stringify(data));
      Snackbar(data?.message);
      resetState();
      navigation.navigate('verifyOtp', {
        screen: 'forgotPassword',
        email: userInput?.email,
      });
    } catch (e: any) {
      setUserInput('loading', false);
      Snackbar(e?.data?.message);
      Log('forgotPassword error', e);
    }
    // End integrating forgotPassword api
  };

  return {userInput, setUserInput, errorObject, validation};
};

export default useForgotPassword;
