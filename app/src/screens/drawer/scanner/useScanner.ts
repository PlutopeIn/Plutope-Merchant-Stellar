import {useResettableState} from '@hooks/useResettableState';
import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ErrorProps, scannerProps} from './scannerProps';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import constant from '@config/constant';
//@ts-ignore
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import Log from '@utility/log';
import Snackbar from '@utility/snackbar';
import validationMessage from '@utility/validation/validationMessage';
import {nonZeroValue} from '@utility/validation/validation';
import {sendPayload} from '@utility/sendPayload';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import {useAppSelector} from '@utility/useReduxHooks';
import {Platform} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import BarcodeScanning from '@react-native-ml-kit/barcode-scanning';

const useScannerController = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'assetDetail'>>();
  const {walletPrivateData, userDetails} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const url =
    constant.mode == 'testnet' ? constant.testnetURL : constant.mainnetURL;
  const [scannerData, setScannerData, resetState] =
    useResettableState<scannerProps>({
      data: '',
      address: '',
      amount: '',
      issuer: route?.params?.data?.issuer,
      memo: '',
      isOpen: false,
      loading: false,
      code: route?.params?.data?.code,
      flashMode: undefined,
    });
  const {token} = useAppSelector(state => state.userReducer);
  const [errorObject, setErrorObject, resetError, updateError] =
    useResettableState<ErrorProps>({
      addressError: undefined,
      amountError: undefined,
      memoError: undefined,
    });

  const onBack = () => {
    resetState();
    resetError();
  };

  const onClickAdd = () => {
    setScannerData('isOpen', true);
  };

  const onRead = (link: string) => {
    if (link.includes('web')) {
      setScannerData('data', link);
      setTimeout(() => {
        getDestinationAddress(link);
      }, 300);
      setScannerData('isOpen', false);
    } else {
      let tempLink = `web+stellar:pay?destination=${link}&asset_code=&asset_issuer=&amount=`;
      setScannerData('data', tempLink);
      setTimeout(() => {
        getDestinationAddress(tempLink);
      }, 300);
      setScannerData('isOpen', false);
    }
  };

  const formatPrice = (text: string) => {
    if ((text.match(/\./g) || []).length > 1) {
      const parts = text.split('.');
      setScannerData('amount', parts[0] + '.' + parts.slice(1).join(''));
    } else if (text.startsWith('.')) {
      setScannerData('amount', '0.');
    } else {
      const numericValue = text.replace(/[^0-9.]/g, '');
      setScannerData('amount', numericValue);
    }
  };

  const validation = (): void => {
    let isValid = true;
    if (!scannerData?.address) {
      isValid = false;
      errorObject.addressError = validationMessage.emptyStellarAddress;
    } else {
      errorObject.addressError = '';
    }
    if (!scannerData?.amount) {
      isValid = false;
      errorObject.amountError = validationMessage.emptyAmount;
    } else if (scannerData?.amount.endsWith('.')) {
      isValid = false;
      errorObject.amountError = validationMessage.invalidAmount;
    } else if (nonZeroValue(scannerData?.amount)) {
      isValid = false;
      errorObject.amountError = validationMessage.zeroAmount;
    } else {
      errorObject.amountError = '';
    }
    // if (!scannerData?.memo) {
    //   isValid = false;
    //   errorObject.memoError = validationMessage.emptyMemo;
    // } else {
    //   errorObject.memoError = '';
    // }
    updateError({...errorObject});
    if (isValid) {
      onSendToken();
    }
  };

  const getDestinationAddress = (data: any) => {
    const destinationMatch = data?.match(/destination=([^&]*)/);
    // const codeMatch = data?.match(/asset_code=([^&]*)/);
    const amountMatch = data?.match(/amount=([^&]*)/);
    // const issuerMatch = data?.match(/asset_issuer=([^&]*)/);
    const memoMatch = data?.match(/memo=([^&]*)/);
    const finalData: any = {
      destination: destinationMatch
        ? decodeURIComponent(destinationMatch[1])
        : null,
      // assetCode: codeMatch ? decodeURIComponent(codeMatch[1]) : null,
      amount: amountMatch ? decodeURIComponent(amountMatch[1]) : null,
      // issuer: issuerMatch ? decodeURIComponent(issuerMatch[1]) : null,
      memo: memoMatch ? decodeURIComponent(memoMatch[1]) : null,
    };
    setScannerData('address', finalData?.destination);
    // setScannerData('code', finalData?.assetCode);
    setScannerData('amount', finalData?.amount);
    // setScannerData('issuer', finalData?.issuer);
    setScannerData('memo', finalData?.memo);
    return finalData;
  };

  const onSendToken = async () => {
    setScannerData('loading', true);
    const server = new StellarSdk.Server(url);
    const sourceSecret = walletPrivateData?.secretKey;
    const sourceKeys = StellarSdk.Keypair.fromSecret(sourceSecret);
    const destinationId = scannerData?.address;
    try {
      // console.log('load account');
      await server.loadAccount(destinationId);
      // console.log('load account end');
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setScannerData('loading', false);
        setScannerData('isOpen', false);
        throw new Error('The destination account does not exist!');
      } else {
        // console.log('create account');
        try {
          const sourceAccount = await server.loadAccount(
            sourceKeys.publicKey(),
          );
          const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase:
              constant.mode == 'testnet'
                ? StellarSdk.Networks.TESTNET
                : StellarSdk.Networks.PUBLIC,
          })
            .addOperation(
              StellarSdk.Operation.createAccount({
                destination: destinationId,
                startingBalance: scannerData?.amount,
              }),
            )
            .addMemo(StellarSdk.Memo.text(scannerData?.memo))
            .setTimeout(500)
            .build();
          transaction.sign(sourceKeys);
          const result = await server.submitTransaction(transaction);
          Log('result:::', result);
          setTimeout(() => {
            setScannerData('isOpen', false);
          }, 300);
          setScannerData('loading', false);
          // console.log('call function step 1 ======');
          sendNotification(
            result?.source_account,
            scannerData.address,
            scannerData.amount,
            result?.id,
            scannerData?.code,
            'Send',
          );
          Snackbar('Send successfully');
          navigation.navigate('drawer');
        } catch (error) {
          Log('create account error :', error);
        }
      }
    }
    // console.log('step 1');
    let asset;
    if (scannerData?.code != 'XLM') {
      // console.log('step 2', scannerData?.issuer, scannerData?.code);
      const assetCode = scannerData?.code;
      const assetIssuer = scannerData?.issuer;
      asset = new StellarSdk.Asset(assetCode, assetIssuer);
      // console.log('step 3', asset);
    }
    // console.log('transaction builder');
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
            asset:
              scannerData?.code == 'XLM' ? StellarSdk.Asset.native() : asset,
            amount: scannerData?.amount,
          }),
        )
        .addMemo(StellarSdk.Memo.text(scannerData?.memo))
        .setTimeout(500)
        .build();
      transaction.sign(sourceKeys);
      const result = await server.submitTransaction(transaction);
      setTimeout(() => {
        setScannerData('isOpen', false);
      }, 300);
      setScannerData('loading', false);
      Snackbar('Send successfully');
      // console.log('call function step 1 ======kakkakak');
      sendNotification(
        result?.source_account,
        scannerData.address,
        scannerData.amount,
        result?.id,
        scannerData?.code,
        'Send',
      );
      navigation.navigate('drawer');
      Log('Send Success:', result);
    } catch (e) {
      setScannerData('loading', false);
      Snackbar('Something went wrong');
      setScannerData('isOpen', false);
      Log('Send Error:', e?.response);
    }
  };

  const handleFlash = () => {
    setScannerData('flashMode', !scannerData?.flashMode);
  };

  const readBardCodeGallery = () => {
    // console.log('test:::');
    ImageCropPicker.openPicker({
      mediaType: 'photo',
    }).then(async image => {
      let path = image.path;
      try {
        // console.log('path:::', path);
        let tempPath = Platform.OS == 'ios' ? `file://${path}` : path;
        const barcodes = await BarcodeScanning.scan(tempPath);

        if (barcodes.length != 0) {
          let link = barcodes[0]?.value;
          onRead(link);
        } else {
          Snackbar('Make sure code is clearly visible on selected image');
        }
      } catch (error) {
        console.log('error:::', error);
      }
    });
  };
  const sendNotification = async (
    fromAddress: string,
    toAddress: string,
    amount: string,
    transactionHash: string,
    assetType: string,
    type: string,
  ) => {
    // console.log('function : ');
    let formData = {
      [params.fromAddress]: fromAddress,
      [params.toAddress]: toAddress,
      [params.amount]: amount,
      [params.transactionHash]: transactionHash,
      [params.assetType]: assetType,
      [params.type]: type,
    };
    console.log('call function step 1 ======', formData);
    try {
      // console.log('call function step 2 ======');
      const {data} = await axiosInstance.post(
        constant.sendPushNotification,
        formData,
        {
          headers: {
            auth: token,
          },
        },
      );
      console.log('send notification data:::', data?.data);
    } catch (error) {
      console.log('error send notification data:::', error);
    }
  };
  return {
    onRead,
    scannerData,
    setScannerData,
    onClickAdd,
    errorObject,
    formatPrice,
    validation,
    onBack,
    route,
    readBardCodeGallery,
    handleFlash,
  };
};

export default useScannerController;
