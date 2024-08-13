import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';

const walletSuccessController = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'walletSuccess'>>();
  const [address, setAddress] = useState<string | undefined>(
    route?.params?.data?.walletAddress,
  );
  const onWalletPress = () => {
    navigation.navigate('biometricPassword');
  };
  return {onWalletPress, address};
};

export default walletSuccessController;
