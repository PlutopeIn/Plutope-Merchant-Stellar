import {useResettableState} from '@hooks/useResettableState';
import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {useNavigation} from '@react-navigation/native';
import {ErrorProps, scannerProps} from './homeScannerProps';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/type';
import constant from '@config/constant';
//@ts-ignore
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import Log from '@utility/log';
import Snackbar from '@utility/snackbar';
import validationMessage from '@utility/validation/validationMessage';
import {nonZeroValue} from '@utility/validation/validation';
import {useEffect} from 'react';
import {sendPayload} from '@utility/sendPayload';
import ImageCropPicker from 'react-native-image-crop-picker';
import BarcodeScanning from '@react-native-ml-kit/barcode-scanning';
import {Platform} from 'react-native';
import params from '@config/params';
import {axiosInstance} from '@api/api';
import {useAppSelector} from '@utility/useReduxHooks';

const useHomeScanner = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {walletPrivateData} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const url =
    constant.mode == 'testnet' ? constant.testnetURL : constant.mainnetURL;

  const {token} = useAppSelector(state => state.userReducer);

  const [scannerData, setScannerData, resetState] =
    useResettableState<scannerProps>({
      data: '',
      address: '',
      amount: '',
      sendAmount: '',
      memo: '',
      currency: '',
      issuer: '',
      assetList: [],
      staticAssetList: [],
      visible: false,
      loading: false,
      amountError: undefined,
      flashMode: undefined,
      code: '',
    });
  const [errorObject, setErrorObject, resetError, updateError] =
    useResettableState<ErrorProps>({
      sendAmountError: undefined,
      memoError: undefined,
    });

  useEffect(() => {
    fetchMyAssets();
  }, []);

  const fetchMyAssets = async () => {
    // #region Start integrating fetchMyAssets api
    try {
      const server = new StellarSdk.Server(url);
      const account = await server.loadAccount(walletPrivateData?.publicKey);
      const tempData = account.balances.map((item: any) => {
        if (!item?.asset_code || !item?.asset_issuer) {
          // Handle the native asset (XLM)
          return {
            domain: 'stellar.org',
            code: 'XLM',
            issuer: null,
            name: 'XLM',
            image: null,
            balance: item?.balance,
          };
        } else {
          return {
            domain: null,
            code: item?.asset_code,
            issuer: item?.asset_issuer,
            name: item?.asset_code,
            image: null,
            balance: item?.balance,
          };
        }
      });
      const finalData = tempData.filter(
        (item: any) => parseFloat(item.balance) > 0,
      );
      setScannerData('assetList', finalData);
      setScannerData('staticAssetList', tempData);
    } catch (e) {
      Log('Error loading balance or fetching asset information:', e);
    }
    // #region End integrating fetchMyAssets api
  };

  const onBack = () => {
    resetState();
    resetError();
  };

  const onRead = (link: string) => {
    if (link.includes('web')) {
      setScannerData('data', link);
      setScannerData('visible', true);
    } else {
      let tempLink = `web+stellar:pay?destination=${link}&asset_code=&asset_issuer=&amount=`;
      setScannerData('data', tempLink);
      setScannerData('visible', true);
    }
  };

  const formatSendPrice = (text: string) => {
    if ((text.match(/\./g) || []).length > 1) {
      const parts = text.split('.');
      setScannerData('sendAmount', parts[0] + '.' + parts.slice(1).join(''));
    } else if (text.startsWith('.')) {
      setScannerData('sendAmount', '0.');
    } else {
      const numericValue = text.replace(/[^0-9.]/g, '');
      setScannerData('sendAmount', numericValue);
    }
  };

  const sendValidation = (): void => {
    let isValid = true;
    if (!scannerData?.sendAmount && !scannerData?.currency) {
      isValid = false;
      errorObject.sendAmountError = validationMessage.emptyAmountCurrency;
    } else if (!scannerData?.sendAmount) {
      isValid = false;
      errorObject.sendAmountError = validationMessage.emptyAmount;
    } else if (scannerData?.sendAmount.endsWith('.')) {
      isValid = false;
      errorObject.sendAmountError = validationMessage.invalidAmount;
    } else if (nonZeroValue(scannerData?.sendAmount)) {
      isValid = false;
      errorObject.sendAmountError = validationMessage.zeroAmount;
    } else if (!scannerData?.currency) {
      isValid = false;
      errorObject.sendAmountError = validationMessage.emptyCurrency;
    } else {
      errorObject.sendAmountError = '';
    }
    // if (!scannerData?.memo) {
    //   isValid = false;
    //   errorObject.memoError = validationMessage.emptyMemo;
    // } else {
    //   errorObject.memoError = '';
    // }
    updateError({...errorObject});
    if (isValid) {
      checkToken();
    }
  };
  const getDestinationAddress = () => {
    const destinationMatch = scannerData?.data?.match(/destination=([^&]*)/);
    const codeMatch = scannerData?.data?.match(/asset_code=([^&]*)/);
    const amountMatch = scannerData?.data?.match(/amount=([^&]*)/);
    const issuerMatch = scannerData?.data?.match(/asset_issuer=([^&]*)/);
    const memoMatch = scannerData?.data?.match(/memo=([^&]*)/);
    const finalData: any = {
      destination: destinationMatch
        ? decodeURIComponent(destinationMatch[1])
        : null,
      assetCode: codeMatch ? decodeURIComponent(codeMatch[1]) : null,
      amount: amountMatch ? decodeURIComponent(amountMatch[1]) : null,
      issuer: issuerMatch ? decodeURIComponent(issuerMatch[1]) : null,
      memo: memoMatch ? decodeURIComponent(memoMatch[1]) : null,
    };
    return finalData;
  };

  const checkToken = () => {
    const doesCodeExist = scannerData?.staticAssetList?.some(
      (asset: any) => asset.code === scannerData?.currency,
    );
    if (doesCodeExist) {
      onSendToken();
    } else {
      setScannerData('amountError', 'Token not exist');
    }
  };

  const onClose = () => {
    setScannerData('visible', false);
    setTimeout(() => {
      navigation.navigate('drawer');
    }, 300);
  };

  useEffect(() => {
    if (
      getDestinationAddress().amount !== '' ||
      getDestinationAddress().memo !== '' ||
      getDestinationAddress().issuer !== ''
    ) {
      setScannerData('sendAmount', getDestinationAddress().amount);
      setScannerData('memo', getDestinationAddress().memo);
      setScannerData('currency', getDestinationAddress().assetCode);
      setScannerData('issuer', getDestinationAddress().issuer);
    }
  }, [getDestinationAddress().amount]);

  const handleFlash = () => {
    setScannerData('flashMode', !scannerData?.flashMode);
  };

  const readBardCodeGallery = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      width: 400,
      height: 400,
    }).then(async image => {
      let path = image.path;
      try {
        let tempPath = Platform.OS == 'ios' ? `file://${path}` : path;
        const barcodes = await BarcodeScanning.scan(tempPath);

        if (barcodes.length != 0) {
          let link = barcodes[0]?.value;
          onRead(link);
        } else {
          Snackbar('Make sure code is clearly visible on selected image');
        }
      } catch (error) {
        Log('error:::', error);
      }
    });
  };
  // const onSendToken = async () => {
  //   setScannerData('loading', true);
  //   const server = new StellarSdk.Server(url);
  //   const sourceSecret = walletPrivateData?.secretKey;
  //   const sourceKeys = StellarSdk.Keypair.fromSecret(sourceSecret);
  //   const destinationId = getDestinationAddress()?.destination;
  //   try {
  //     await server.loadAccount(destinationId);
  //   } catch (error: any) {
  //     setScannerData('loading', false);
  //     setScannerData('visible', false);
  //     if (error.response && error.response.status === 404) {
  //       throw new Error('The destination account does not exist!');
  //     } else {
  //       Snackbar('Something went wrong');
  //       Log('Error loading destination account:', error);
  //       return;
  //     }
  //   }
  //   let asset;
  //   if (scannerData?.currency != 'XLM') {
  //     const assetCode = scannerData?.currency;
  //     const assetIssuer = scannerData?.issuer;
  //     asset = new StellarSdk.Asset(assetCode, assetIssuer);
  //   }
  //   try {
  //     const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
  //     const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
  //       fee: StellarSdk.BASE_FEE,
  //       networkPassphrase:
  //         constant.mode == 'testnet'
  //           ? StellarSdk.Networks.TESTNET
  //           : StellarSdk.Networks.PUBLIC,
  //     })
  //       .addOperation(
  //         StellarSdk.Operation.payment({
  //           destination: destinationId,
  //           asset:
  //             scannerData?.currency == 'XLM'
  //               ? StellarSdk.Asset.native()
  //               : asset,
  //           amount: scannerData?.sendAmount,
  //         }),
  //       )
  //       .addMemo(StellarSdk.Memo.text(scannerData?.memo))
  //       .setTimeout(180)
  //       .build();
  //     transaction.sign(sourceKeys);
  //     const result = await server.submitTransaction(transaction);
  //     setTimeout(() => {
  //       setScannerData('visible', false);
  //     }, 300);
  //     setScannerData('loading', false);
  //     // sendPayload(
  //     //   result?.source_account,
  //     //   scannerData.address,
  //     //   result?.memo,
  //     //   result?.id,
  //     // );
  //     Snackbar('Send successfully');
  //     navigation.navigate('drawer');
  //     Log('Send Success:', result);
  //   } catch (e) {
  //     setScannerData('loading', false);
  //     Snackbar('Something went wrong');
  //     setScannerData('visible', false);
  //     Log('Send Error:', e);
  //   }
  // };

  const onSendToken = async () => {
    setScannerData('loading', true);
    const assetIssuer = scannerData?.issuer ?? getDestinationAddress()?.issuer;
    const assetcode =
      scannerData?.currency ?? getDestinationAddress()?.assetCode;

    const memo = scannerData?.memo ?? getDestinationAddress()?.memo;
    const destinationId = getDestinationAddress()?.destination;
    const sentAmount = scannerData?.sendAmount;

    // console.log(
    //   'destinationId',
    //   destinationId,
    //   'scannerData?.sendAmount',
    //   scannerData?.sendAmount,
    //   'memooo?.memo',
    //   memo,
    //   'issuer',
    //   assetIssuer,
    //   'assetcode',
    //   assetcode,
    // );

    // console.log('scannerData?.sendAmount', scannerData);

    const server = new StellarSdk.Server(url);
    const sourceSecret = walletPrivateData?.secretKey;
    const sourceKeys = StellarSdk.Keypair.fromSecret(sourceSecret);
    try {
      await server.loadAccount(destinationId);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setScannerData('loading', false);
        setScannerData('visible', false);
        throw new Error('The destination account does not exist!');
      } else {
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
                startingBalance: sentAmount,
              }),
            )
            .addMemo(StellarSdk.Memo.text(memo ?? 'Transaction'))
            .setTimeout(500)
            .build();
          transaction.sign(sourceKeys);
          const result = await server.submitTransaction(transaction);
          Log('result:::', result);
          setTimeout(() => {
            setScannerData('visible', false);
          }, 300);
          setScannerData('loading', false);
          // console.log('call function step 1 ======');
          sendNotification(
            result?.source_account,
            destinationId,
            sentAmount,
            result?.id,
            assetcode,
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
    if (assetcode != 'XLM') {
      asset = new StellarSdk.Asset(assetcode, assetIssuer);
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
            asset: assetcode == 'XLM' ? StellarSdk.Asset.native() : asset,
            amount: sentAmount,
          }),
        )
        .addMemo(StellarSdk.Memo.text(memo ?? 'Transaction'))
        .setTimeout(500)
        .build();
      transaction.sign(sourceKeys);
      const result = await server.submitTransaction(transaction);
      setTimeout(() => {
        setScannerData('visible', false);
      }, 300);
      setScannerData('loading', false);
      Snackbar('Send successfully');
      // console.log('call function step 1 ======kakkakak');
      sendNotification(
        result?.source_account,
        destinationId,
        sentAmount,
        result?.id,
        assetcode,
        'Send',
      );
      navigation.navigate('drawer');
      Log('Send Success:', result);
    } catch (e: any) {
      setScannerData('loading', false);
      Snackbar('Something went wrong');
      setScannerData('visible', false);
      Log('Send Error:', e?.response);
    }
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
    // console.log('call function step 1 ======', formData);
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
    getDestinationAddress,
    errorObject,
    onBack,
    sendValidation,
    formatSendPrice,
    onClose,
    readBardCodeGallery,
    handleFlash,
  };
};

export default useHomeScanner;
