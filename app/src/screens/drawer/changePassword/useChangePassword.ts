import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {errorProps, userInputProps} from './changePasswordProps';
import {checkPassword} from '@utility/validation/validation';
import validationMessage from '@utility/validation/validationMessage';
import Snackbar from '@utility/snackbar';
import Log from '@utility/log';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import params from '@config/params';
import {useResettableState} from '@hooks/useResettableState';
import {RootState} from '@redux/type';
import {useSelector} from 'react-redux';

const changePasswordController = () => {
  const {token} = useSelector((state: RootState) => state.userReducer);
  const navigation = useNavigation<AuthNavigationProps>();
  const [userInput, setUserInput, resetState] =
    useResettableState<userInputProps>({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      loading: false,
    });
  const [errorObject, setErrorObject] = useState<errorProps>({
    oldPasswordError: undefined,
    newPasswordError: undefined,
    confirmPasswordError: undefined,
  });

  const validation = () => {
    let isValid = true;
    if (!userInput?.oldPassword) {
      isValid = false;
      errorObject.oldPasswordError = validationMessage.emptyOldPassword;
    } else if (!checkPassword(userInput?.oldPassword)) {
      isValid = false;
      errorObject.oldPasswordError = validationMessage.invalidOldPassword;
    } else {
      errorObject.oldPasswordError = '';
    }
    if (!userInput?.newPassword) {
      isValid = false;
      errorObject.newPasswordError = validationMessage.emptyNewPassword;
    } else if (!checkPassword(userInput?.newPassword)) {
      isValid = false;
      errorObject.newPasswordError = validationMessage.invalidNewPassword;
    } else {
      errorObject.newPasswordError = '';
    }
    if (!userInput?.confirmPassword) {
      isValid = false;
      errorObject.confirmPasswordError =
        validationMessage.emptyConfirmNewPassword;
    } else if (userInput?.confirmPassword !== userInput?.newPassword) {
      isValid = false;
      errorObject.confirmPasswordError =
        validationMessage.invalidNewPasswordMatch;
    } else {
      errorObject.confirmPasswordError = '';
    }
    setErrorObject({...errorObject});
    if (isValid) {
      changePasswordApiCall();
    }
  };

  const changePasswordApiCall = async () => {
    // #region Start integrating changePassword api
    setUserInput('loading', true);
    const formData = {
      [params.oldPassword]: userInput?.oldPassword,
      [params.newPassword]: userInput?.newPassword,
    };
    try {
      const {data} = await axiosInstance.post(
        constant.changePassword,
        formData,
        {
          headers: {
            auth: `${token}`,
          },
        },
      );
      Log('changePassword response', JSON.stringify(data));
      Snackbar(data?.message);
      resetState();
      navigation.goBack();
    } catch (e: any) {
      setUserInput('loading', false);
      Snackbar(e?.data?.message);
      Log('changePassword error', e);
    }
    // End integrating changePassword api
  };

  return {userInput, setUserInput, errorObject, validation};
};

export default changePasswordController;
