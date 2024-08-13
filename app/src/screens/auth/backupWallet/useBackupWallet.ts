import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';

const useBackupWallet = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const onUnderStand = () => {
    navigation?.navigate('recoveryPhrase');
  };
  return {onUnderStand};
};

export default useBackupWallet;
