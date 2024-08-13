import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';

const useSecretPhrase = () => {
  const navigation = useNavigation<AuthNavigationProps>();

  const onBackupManually = () => {
    navigation.navigate('recoveryPhrase');
  };

  return {onBackupManually};
};

export default useSecretPhrase;
