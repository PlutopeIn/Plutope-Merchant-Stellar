import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '@utility/useReduxHooks';
import {logout} from '@redux/user/userSlice';
import Snackbar from '@utility/snackbar';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import Clipboard from '@react-native-clipboard/clipboard';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import Log from '@utility/log';
import {Alert} from 'react-native';
import params from '@config/params';

const useDrawerContentController = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const {walletPrivateData, userDetails, token} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [link, setLink] = useState<any>('');
  const onPress = (screen: string, label: string) => {
    if (label == 'Logout') {
      onLogout();
    }  else {
      navigation.navigate(screen);
    }
  };

  useEffect(() => {
    getLink();
  }, []);

  const getLink = async () => {
    // #region Start integrating getLink api
    try {
      const {data} = await axiosInstance.get(`${constant.getContactDetails}`);
      Log('getLink success', JSON.stringify(data));
      setLink(data?.data);
    } catch (e: any) {
      Log('getLink error', e);
    }
    // #region End integrating getLink api
  };

  const onViewSecret = () => {
    setIsVisible(!isVisible);
  };
  const deleteAccountApi = async () => {
    try {
      const formData = {
        [params.userId]: userDetails?.getUser?._id,
        [params.deleteAccountRequest]: true,
      };
      const {data} = await axiosInstance.post(
        constant.deleteAccount,
        formData,
        {
          headers: {
            auth: token,
          },
        },
      );
      dispatch(logout());
      setTimeout(() => {
        Snackbar(data?.message);
      }, 300);
      navigation.reset({
        index: 0,
        routes: [{name: 'login'}],
      });
    } catch (error: any) {
      console.log(error?.data);
      Snackbar(error?.data?.message);
    }
  };
  const onDeleteAccount = () => {
    Alert.alert('Delete Account', 'Are you sure want to Delete Account ?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Confirm',
        onPress: () => deleteAccountApi(),
        style: 'destructive',
      },
    ]);
  };

  const onCopy = () => {
    let copyStr = walletPrivateData?.publicKey
      ? walletPrivateData?.publicKey
      : '';
    Clipboard.setString(copyStr);
    Snackbar('Copied to clipboard !!');
  };

  const onLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      Snackbar('You have successfully logged out!');
    }, 300);
    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };

  return {onPress, onViewSecret, isVisible, onCopy, link};
};

export default useDrawerContentController;
