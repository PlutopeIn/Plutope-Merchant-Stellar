import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const useLogin = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const [checked, setChecked] = useState(false);

  const continueButton = () => {
    navigation.navigate('secretPhrase');
  };
  const onPrivacy = () => {};

  return {continueButton, checked, setChecked, onPrivacy};
};

export default useLogin;
