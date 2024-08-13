import { axiosInstance } from '@api/api';
import constant from '@config/constant';
import params from '@config/params';
import {useNavigation} from '@react-navigation/native';
import { logout } from '@redux/user/userSlice';
import Snackbar from '@utility/snackbar';
import { useAppDispatch, useAppSelector } from '@utility/useReduxHooks';
import { Alert, Linking } from 'react-native';

const useSettingController = () => {
  const navigation = useNavigation<any>();
  const {token,userDetails} = useAppSelector(state=>state.userReducer)
  const dispatch = useAppDispatch()
  const onClick = (screen: string | undefined,label:string) => {
    if(screen){
      navigation.navigate(screen);
    }
    else if(label == "Delete Account") {
      onDeleteAccount()
    }
    else
    {
      Linking.openURL('https://www.plutope.io/')
    }
   
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
        Snackbar("We will review your delete account request and get back to you");
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
  return {onClick};
};

export default useSettingController;
