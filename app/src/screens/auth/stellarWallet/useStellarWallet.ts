import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';

const useStellarWallet = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const onCreate = () => {
    navigation?.navigate('backupWallet');
  };
  const onConnect = () => {
    navigation?.navigate('kybProcess');
  };
  return {onCreate, onConnect};
};

export default useStellarWallet;
