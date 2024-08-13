import constant from '@config/constant';
import {useResettableState} from '@hooks/useResettableState';
//@ts-ignore
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import {RootState} from '@redux/type';
import {useSelector} from 'react-redux';
import {ErrorProps, RequestPaymentProps} from './requestPaymentProps';
import Log from '@utility/log';
import {useEffect} from 'react';
import validationMessage from '@utility/validation/validationMessage';
import {checkEmail, nonZeroValue} from '@utility/validation/validation';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import Snackbar from '@utility/snackbar';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '@navigation/authStack/authStack';

const useRequestPayment = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {walletPrivateData, token, userDetails} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const url =
    constant.mode == 'testnet' ? constant.testnetURL : constant.mainnetURL;
  const [requestPaymentData, setRequestPaymentData, resetState, updateState] =
    useResettableState<RequestPaymentProps>({
      email: '',
      amount: '',
      currency: '',
      issuer: '',
      message: '',
      load: false,
      assetList: [],
      memo: '',
    });
  const [errorObject, setErrorObject, resetError, updateError] =
    useResettableState<ErrorProps>({
      emailError: undefined,
      amountError: undefined,
      currencyError: undefined,
    });

  useEffect(() => {
    fetchMyAssets();
    getInvoiceNumber();
  }, []);
  const getInvoiceNumber = async () => {
    try {
      const {data} = await axiosInstance.get(constant.getInvoiceNumber, {
        headers: {
          auth: token,
        },
      });
      setRequestPaymentData('memo', data?.data);
    } catch (error) {}
  };
  const fetchMyAssets = async () => {
    // #region Start integrating fetchMyAssets api
    try {
      const server = new StellarSdk.Server(url);
      const account = await server.loadAccount(walletPrivateData?.publicKey);
      const tempData = account.balances.map((item: any) => {
        return {
          name: `${item?.asset_code ? item?.asset_code : 'XLM'}`,
          issuer: `${item?.asset_issuer ? item?.asset_issuer : ''}`,
        };
      });
      setRequestPaymentData('assetList', tempData);
    } catch (e) {
      let temp = [];
      temp.push({name: 'XLM'});
      setRequestPaymentData('assetList', temp);
      Log('Error loading balance or fetching asset information:', e);
    }
    // #region End integrating fetchMyAssets api
  };

  const formatPrice = (text: string) => {
    if ((text.match(/\./g) || []).length > 1) {
      const parts = text.split('.');
      setRequestPaymentData('amount', parts[0] + '.' + parts.slice(1).join(''));
    } else if (text.startsWith('.')) {
      setRequestPaymentData('amount', '0.');
    } else {
      const numericValue = text.replace(/[^0-9.]/g, '');
      setRequestPaymentData('amount', numericValue);
    }
  };

  const validation = (): void => {
    let isValid = true;
    if (!requestPaymentData?.email) {
      isValid = false;
      errorObject.emailError = validationMessage.emptyEmail;
    } else if (!checkEmail(requestPaymentData?.email)) {
      isValid = false;
      errorObject.emailError = validationMessage.invalidEmail;
    } else {
      errorObject.emailError = '';
    }
    if (!requestPaymentData?.amount) {
      isValid = false;
      errorObject.amountError = validationMessage.emptyAmount;
    } else if (requestPaymentData?.amount.endsWith('.')) {
      isValid = false;
      errorObject.amountError = validationMessage.invalidAmount;
    } else if (nonZeroValue(requestPaymentData?.amount)) {
      isValid = false;
      errorObject.amountError = validationMessage.zeroAmount;
    } else {
      errorObject.amountError = '';
    }
    if (!requestPaymentData?.currency) {
      isValid = false;
      errorObject.currencyError = validationMessage.emptyCurrency;
    } else {
      errorObject.currencyError = '';
    }
    updateError({...errorObject});
    if (isValid) {
      requestPaymentApiCall();
    }
  };
  // console.log(requestPaymentData?.memo);
  const requestPaymentApiCall = async () => {
    const link = `web+stellar:pay?destination=${
      walletPrivateData?.publicKey
    }&asset_code=${requestPaymentData?.currency?.toUpperCase()}&asset_issuer=${
      requestPaymentData?.issuer
    }&amount=${requestPaymentData?.amount}&memo=${
      requestPaymentData?.memo
    }&memo_type=MEMO_TEXT&msg=`;
    // #region Start integrating requestPayment api
    setRequestPaymentData('load', true);
    const formData = {
      [params.requestFrom]: requestPaymentData?.email,
      [params.amount]: requestPaymentData?.amount,
      [params.currency]: requestPaymentData?.currency,
      [params.message]: requestPaymentData?.message,
      [params.link]: link,
      [params.memoId]: requestPaymentData?.memo,
    };
    try {
      const {data} = await axiosInstance.post(
        constant.requestPayment,
        formData,
        {
          headers: {
            auth: `${token}`,
          },
        },
      );
      Log('requestPayment response', JSON.stringify(data));
      Snackbar(data?.message);
      resetState();
      navigation.goBack();
    } catch (e: any) {
      setRequestPaymentData('load', false);
      Snackbar(e?.data?.message);
      Log('requestPayment error', e);
    }
    // End integrating requestPayment api
  };

  return {
    requestPaymentData,
    setRequestPaymentData,
    errorObject,
    validation,
    formatPrice,
  };
};

export default useRequestPayment;
