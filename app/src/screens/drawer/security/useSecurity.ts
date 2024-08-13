import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useCallback, useState} from 'react';
import {securityDetailProps} from './securityProps';

const useSecurity = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const [security, setSecurity] = useState<securityDetailProps>({
    appLock: true,
    transactionSigning: false,
    securityScanner: false,
  });
  const updatesecurityValue = useCallback(
    (key: string, value: string | boolean) => {
      setSecurity(prevState => ({...prevState, [key]: value}));
    },
    [security],
  );
  const onUpdate = () => {
    navigation.navigate('kybProcess');
  };
  return {security, updatesecurityValue};
};

export default useSecurity;
