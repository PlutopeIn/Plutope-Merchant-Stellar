import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';

const useSettlementPayment = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const [withdraw, setWithdraw] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    swiftCode: '',
  });

  const updateBankDetailsInputValue = useCallback(
    (key: string, value: string | boolean) => {
      setBankDetails(prevState => ({...prevState, [key]: value}));
    },
    [bankDetails],
  );
  const onWithdraw = () => {
    setWithdraw(true);
  };
  const onAutomatePayment = () => {
    navigation.navigate('amountSuccess', {type: 'transfer'});
  };
  const onProceed = () => {
    navigation.navigate('amountSuccess', {type: 'credit'});
  };
  const onProceedBankDetails = () => {
    setWithdraw(false);
  };
  return {
    withdraw,
    onWithdraw,
    onAutomatePayment,
    onProceed,
    onProceedBankDetails,
    bankDetails,
    updateBankDetailsInputValue,
  };
};

export default useSettlementPayment;
