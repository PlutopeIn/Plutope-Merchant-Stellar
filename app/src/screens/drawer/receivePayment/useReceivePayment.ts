import {useResettableState} from '@hooks/useResettableState';
import {RootState} from '@redux/type';
import {useAppSelector} from '@utility/useReduxHooks';
import {useEffect} from 'react';
import {Share} from 'react-native';
import {receivePaymentProps} from './receivePaymentProps';
import validationMessage from '@utility/validation/validationMessage';
import {nonZeroValue} from '@utility/validation/validation';
import Clipboard from '@react-native-clipboard/clipboard';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AuthParams} from '@navigation/authStack/authStack';
//@ts-ignore
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import Log from '@utility/log';
import constant from '@config/constant';

const useReceivePaymentController = () => {
  const route = useRoute<RouteProp<AuthParams, 'assetDetail'>>();
  const info: any = route?.params;
  const {walletPrivateData, userDetails} = useAppSelector(
    (state: RootState) => state.userReducer,
  );
  const url =
    constant.mode == 'testnet' ? constant.testnetURL : constant.mainnetURL;
  const [qrcodeDetail, setQrcodeDetail, resetState] =
    useResettableState<receivePaymentProps>({
      visible: true,
      success: false,
      qrCodeData: '',
      amount: '',
      finalAmount: '',
      currency: '',
      issuer: '',
      amountError: undefined,
      currencyError: undefined,
      assetList: [],
    });

  useEffect(() => {
    fetchMyAssets();
  }, []);

  useEffect(() => {
    if (info?.screen == 'receiveAsset') {
      setQrcodeDetail('currency', info?.data?.code);
      setQrcodeDetail('issuer', info?.data?.issuer ?? '');
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (qrcodeDetail?.finalAmount == '' && info?.screen != 'receiveAsset') {
        setQrcodeDetail(
          'qrCodeData',
          `web+stellar:pay?destination=${walletPrivateData?.publicKey}&asset_code=&asset_issuer=&amount=`,
        );
      } else {
        setQrcodeDetail(
          'qrCodeData',
          `web+stellar:pay?destination=${
            walletPrivateData?.publicKey
          }&asset_code=${qrcodeDetail?.currency?.toUpperCase()}&asset_issuer=${
            qrcodeDetail?.issuer
          }&amount=${qrcodeDetail?.finalAmount}`,
        );
      }
    }, 300);
  }, [qrcodeDetail?.finalAmount, qrcodeDetail?.currency]);
  // console.log('qr:::', qrcodeDetail?.qrCodeData);
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
      setQrcodeDetail('assetList', tempData);
    } catch (e) {
      let temp = [];
      temp.push({name: 'XLM'});
      setQrcodeDetail('assetList', temp);
      Log('Error loading balance or fetching asset information:', e);
    }
    // #region End integrating fetchMyAssets api
  };

  const formatPrice = (text: string) => {
    if ((text.match(/\./g) || []).length > 1) {
      const parts = text.split('.');
      setQrcodeDetail('amount', parts[0] + '.' + parts.slice(1).join(''));
    } else if (text.startsWith('.')) {
      setQrcodeDetail('amount', '0.');
    } else {
      const numericValue = text.replace(/[^0-9.]/g, '');
      setQrcodeDetail('amount', numericValue);
    }
  };

  const validation = (): void => {
    let isValid = true;
    if (!qrcodeDetail?.amount) {
      isValid = false;
      setQrcodeDetail('amountError', validationMessage.emptyAmount);
    } else if (qrcodeDetail?.amount.endsWith('.')) {
      isValid = false;
      setQrcodeDetail('amountError', validationMessage.invalidAmount);
    } else if (nonZeroValue(qrcodeDetail?.amount)) {
      isValid = false;
      setQrcodeDetail('amountError', validationMessage.zeroAmount);
    } else {
      setQrcodeDetail('amountError', '');
    }
    if (!qrcodeDetail?.currency) {
      isValid = false;
      setQrcodeDetail('currencyError', validationMessage.emptyCurrency);
    } else {
      setQrcodeDetail('currencyError', '');
    }
    if (isValid) {
      onChangeAmount();
    }
  };

  const onChangeAmount = () => {
    setQrcodeDetail('finalAmount', qrcodeDetail?.amount);
    setQrcodeDetail('visible', false);
    // setTimeout(() => {
    //   setQrcodeDetail('success', true);
    // }, 300);
  };

  const onClickShare = () => {
    Share.share({
      message: qrcodeDetail?.qrCodeData,
    });
  };
  const onClickCopy = () => {
    let copyStr = walletPrivateData?.publicKey
      ? walletPrivateData?.publicKey
      : '';
    Clipboard.setString(copyStr);
  };

  const onClickClose = () => {
    setQrcodeDetail('amount', '');
    setQrcodeDetail('amountError', undefined);
    // setQrcodeDetail('currency', '');
    setQrcodeDetail('currencyError', undefined);
    // setQrcodeDetail('issuer', '');
    setQrcodeDetail('visible', false);
  };
  const onClickAmount = () => {
    setQrcodeDetail('amount', qrcodeDetail?.finalAmount);
    setQrcodeDetail('visible', true);
  };

  return {
    validation,
    walletPrivateData,
    onClickCopy,
    onClickShare,
    qrcodeDetail,
    setQrcodeDetail,
    onClickClose,
    onClickAmount,
    formatPrice,
    info,
    userDetails,
  };
};

export default useReceivePaymentController;
