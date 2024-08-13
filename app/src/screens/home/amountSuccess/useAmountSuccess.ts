import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';

const useAmountSuccess = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'amountSuccess'>>();
  const [credited, setCredited] = useState(false);
  useEffect(() => {
    if (route?.params?.type === 'transfer') {
      setCredited(true);
    } else if (route?.params?.type === 'credit') {
      setCredited(false);
    }
  }, []);
  const onTransferred = () => {
    navigation.goBack();
  };
  const onCredited = () => {
    navigation.goBack();
  };
  return {
    credited,
    onTransferred,
    onCredited,
  };
};

export default useAmountSuccess;
