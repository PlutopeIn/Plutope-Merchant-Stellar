import {useResettableState} from '@hooks/useResettableState';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import Snackbar from '@utility/snackbar';
import {useRef} from 'react';
import WebView from 'react-native-webview';
//@ts-ignore
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import constant from '@config/constant';
import {useAppSelector} from '@utility/useReduxHooks';
import Log from '@utility/log';
import {axiosInstance} from '@api/api';
import {BuyProps} from './buyProps';

const useSell = () => {
  const ref = useRef<WebView>(null);
  const [sellState, setSellState, resetState] = useResettableState<BuyProps>({
    load: true,
    loading: false,
    successTransaction: false,
  });
  const navigation = useNavigation<AuthNavigationProps>();
  const {walletPrivateData} = useAppSelector(state => state.userReducer);
  const url =
    constant.mode == 'testnet' ? constant.testnetURL : constant.mainnetURL;
  var interval: any;

  const moonPayApi = async (obj: any) => {
    var urlRegex = /[?&]([^=#]+)=([^&#]*)/g,
      params: any = {},
      match;
    while ((match = urlRegex?.exec(obj.url))) {
      params[match[1]] = match[2];
    }
    const transactionId = params?.transactionId;
    Log('transactionId', transactionId);
    if (transactionId) {
      try {
        const {data} = await axiosInstance.get(
          `https://api.moonpay.com/v1/transactions/${transactionId}?apiKey=pk_test_oxQY1qdAGKlItZrVIRQ9qpNwpfAPHjQ`,
          {
            headers: {
              accept: 'application/json',
            },
          },
        );
        onSendToken(
          data?.walletAddress,
          data?.baseCurrencyAmount,
          data?.walletAddressTag,
          transactionId,
        );
      } catch (error) {
        Log('errorL;', error);
      }
    }
  };

  const onClose = () => {
    setSellState('successTransaction', false);
    navigation.navigate('drawer');
  };

  const onSendToken = async (
    destinationId: string,
    baseCurrencyAmount: number,
    memo: any,
    transactionId: string,
  ) => {
    setSellState('loading', true);
    Log(destinationId, baseCurrencyAmount);
    const server = new StellarSdk.Server(url);
    const sourceSecret = walletPrivateData?.secretKey;
    const sourceKeys = StellarSdk.Keypair.fromSecret(sourceSecret);
    try {
      Log('load account', '');
      await server.loadAccount(destinationId);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setSellState('loading', false);
        Log('The destination account does not exist!', '');
      } else {
        setSellState('loading', false);
        Snackbar('Something went wrong');
        Log('Error loading destination account:', error);
        return;
      }
    }
    try {
      const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase:
          constant.mode == 'testnet'
            ? StellarSdk.Networks.TESTNET
            : StellarSdk.Networks.PUBLIC,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationId,
            asset: StellarSdk.Asset.native(),
            amount: baseCurrencyAmount.toString(),
          }),
        )
        .addMemo(StellarSdk.Memo.text(`${memo}`))
        .setTimeout(180)
        .build();

      transaction.sign(sourceKeys);
      const result = await server.submitTransaction(transaction);
      interval = setInterval(() => {
        moonPayApiInterval(transactionId);
      }, 1000);
      Log('Send Success:', result);
    } catch (e) {
      Log('Send Error:', e);
    }
  };

  const moonPayApiInterval = async (transactionId: string) => {
    try {
      const {data} = await axiosInstance.get(
        `https://api.moonpay.com/v1/transactions/${transactionId}?apiKey=pk_test_oxQY1qdAGKlItZrVIRQ9qpNwpfAPHjQ`,
        {
          headers: {
            accept: 'application/json',
          },
        },
      );
      if (data?.status == 'pending') {
        setSellState('loading', false);
      } else if (data?.status == 'completed') {
        clearInterval(interval);
        setSellState('successTransaction', true);
      }
    } catch (error) {
      Log('errorL;', error);
    }
  };
  return {setSellState, sellState, ref, moonPayApi, onClose};
};
export default useSell;
