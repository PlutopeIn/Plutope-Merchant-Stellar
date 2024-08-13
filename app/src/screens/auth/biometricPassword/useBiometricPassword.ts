import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {BackHandler} from 'react-native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import validationMessage from '@utility/validation/validationMessage';
import {useAppDispatch, useAppSelector} from '@utility/useReduxHooks';
import {setPasscode, verified} from '@redux/user/userSlice';
import Log from '@utility/log';

const rnBiometrics = new ReactNativeBiometrics();

const useBiometricPassword = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const user = useAppSelector(state => state.userReducer);
  const pinView = useRef<any>();
  const [pin, setPin] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [checkAvailable, setCheckAvailable] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkBiometric();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('biometricPassword');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const checkBiometric = async () => {
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    setCheckAvailable(available);
    if (available) {
      rnBiometrics
        .simplePrompt({
          promptMessage: 'Biometric login for B4Hit-Exchange',
        })
        .then(resultObject => {
          const {success} = resultObject;
          if (success) {
            handleNavigation();
          } else {
          }
        })
        .catch(() => {});
    } else {
    }
  };

  useEffect(() => {
    if (user?.passcode) {
      if (pin?.length === 6) {
        if (user?.passcode !== pin) {
          pinView.current?.clearAll();
          setPasscodeError(validationMessage.invalidPasscode);
        } else {
          handleNavigation();
        }
      }
    } else {
      if (pin?.length === 6) {
        dispatch(setPasscode(pin));
        setPin('');
        pinView.current?.clearAll();
      }
    }
  }, [pin]);

  const onBiomatric = async () => {
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    if (available) {
      rnBiometrics
        .simplePrompt({promptMessage: 'Biometric login for B4Hit-Exchange'})
        .then(resultObject => {
          const {success} = resultObject;
          if (success) {
            handleNavigation();
          } else {
          }
        })
        .catch(err => {
          Log('biometrics failed', err);
        });
    } else {
    }
  };
  const handleNavigation = () => {
    navigation.navigate('setStore');
    dispatch(verified(true));
  };

  const onButtonPress = (key: string) => {
    if (key === 'custom_left') {
      onBiomatric();
    }
    if (key === 'custom_right') {
      pinView.current?.clear();
    }
    if (key === 'three') {
      pinView.current?.clearAll();
    }
  };

  return {
    pinView,
    setPin,
    passcodeError,
    checkAvailable,
    user,
    onButtonPress,
  };
};

export default useBiometricPassword;
