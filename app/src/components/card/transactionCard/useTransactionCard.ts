import constant from '@config/constant';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@redux/type';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const useTransactionCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<AuthNavigationProps>();
  const {walletPrivateData} = useSelector(
    (state: RootState) => state.userReducer,
  );

  const onClick = (item: any) => {
    setIsVisible(false);
    setTimeout(() => {
      navigation.navigate('webViewScreen', {
        title: 'Transaction Detail',
        link: `${constant.transactionUrl}${item.transactionHash}`,
      });
    }, 300);
  };
  return {onClick, isVisible, setIsVisible, walletPrivateData};
};

export default useTransactionCard;
