import {AuthNavigationProps} from '@navigation/authStack/authStack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootState} from '@redux/type';
import {useSelector} from 'react-redux';
//@ts-ignore
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import {useEffect} from 'react';
import {DashboardDataProps, DashboardProps} from './dashboardProps';
import {useResettableState} from '@hooks/useResettableState';
import Log from '@utility/log';
import constant from '@config/constant';
import {axiosInstance} from '@api/api';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from '@utility/snackbar';
import {useAppDispatch} from '@utility/useReduxHooks';
import {updateBalance} from '@redux/user/userSlice';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
const useDashboardController = () => {
  type DrawerNavigationParams = {};
  const {walletPrivateData, balance, signupDetails, token} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const url =
    constant.mode == 'testnet' ? constant.testnetURL : constant.mainnetURL;
  Log('redux balance:', balance);
  const navigation = useNavigation<AuthNavigationProps>();
  const navigationOpen =
    useNavigation<DrawerNavigationProp<DrawerNavigationParams>>();
  const [dashboardData, setDashboardData] = useResettableState<DashboardProps>({
    assetData: [],
    loading: true,
    refreshing: false,
    balance: balance,
    kycKybStatus: undefined,
    kycModal: false,
    kybModal: false,
    modalRefreshing: false,
  });
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // handleReceivePayment();
    getFcmToken();
    handleNotification();
  }, []);
  useEffect(() => {
    if (isFocus) {
      fetchMyAssetsList();
      if (!dashboardData.loading) {
        getKybKycStatus();
      }
    }
  }, [isFocus, dashboardData?.loading]);
  const getFcmToken = async () => {
    const token = await messaging().getToken();
    Log('fcmtoken::::', token);
    fcmTokenUpdate(token);
  };
  const handleNotification = () => {
    messaging().onMessage((remoteMessage: any) => {
      Log('message::', remoteMessage);
      PushNotification.cancelAllLocalNotifications();
      PushNotification.localNotification({
        channelId: 'Stellar Channel',
        title: remoteMessage?.notification?.title,
        message: remoteMessage?.notification?.body,
      });
      Log('data::', remoteMessage?.data?.notificationType);
    });
    /* Notification navigation when app is in kill mode */
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
        }
      });
  };
  const fcmTokenUpdate = async (fcmToken: string) => {
    let formData = {
      fcmToken: fcmToken,
    };
    try {
      const {data} = await axiosInstance.post(
        constant.updateFcmToken,
        formData,
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('fcm token update:::', data);
    } catch (error) {
      Log('error fcm token update:::', error);
    }
  };
  const handleReceivePayment = async () => {
    try {
      const server = new StellarSdk.Server(url);
      var payments = server.payments().forAccount(walletPrivateData?.publicKey);
      payments.stream({
        onmessage: function (payment: any) {
          Log('receive payment', JSON.stringify(payment));
          fetchMyAssetsList();
        },

        onerror: function (error: any) {
          Log('Error in payment stream', error);
        },
      });
    } catch (error: any) {
      Log('Error in stream', error);
    }
  };
  const getKybKycStatus = async () => {
    try {
      const {data} = await axiosInstance.get(constant.kyckybStatus, {
        headers: {
          auth: `${token}`,
        },
      });
      setDashboardData('modalRefreshing', false);
      setDashboardData('kycKybStatus', data?.data);
      if (data?.data?.kycStatus == 'Pending') {
        setDashboardData('kycModal', true);
      } else if (data?.data?.kybStatus == 'Pending') {
        setDashboardData('kybModal', true);
      }
    } catch (error) {}
  };
  const refreshCall = () => {
    setDashboardData('refreshing', true);
    fetchMyAssetsList();
  };
  const fetchMyAssetsList = async () => {
    // #region Start integrating fetchMyAssets api
    try {
      const server = new StellarSdk.Server(url);
      const account = await server.loadAccount(walletPrivateData?.publicKey);
      Log('account:::', account);
      const balances = account.balances;
      // Fetch asset information for each asset in the array
      await Promise.all(
        balances.map((asset: any) =>
          fetchAssetInfo(asset.asset_code, asset.asset_issuer, asset.balance),
        ),
      )
        .then(assetInfos => {
          setDashboardData('assetData', assetInfos?.reverse());
          calculateSum(assetInfos);
          setDashboardData('loading', false);
          setDashboardData('refreshing', false);
        })
        .catch(e => {
          setDashboardData('loading', false);
          setDashboardData('refreshing', false);
          Log('Error fetching asset information:', e);
        });
    } catch (e) {
      setDashboardData('loading', false);
      setDashboardData('refreshing', false);
      Log('Error loading balance or fetching asset information:', e);
      dispatch(updateBalance('0.0'));
    }
    // #region End integrating fetchMyAssets api
  };
  {
    // console.log('dashboardData?.assetData', dashboardData?.assetData);
  }
  const onRefreshCall = () => {
    setDashboardData('modalRefreshing', true);
    getKybKycStatus();
  };
  const fetchAssetInfo = async (
    assetCode: string,
    assetIssuer: string,
    balance: string,
  ) => {
    try {
      if (!assetCode || !assetIssuer) {
        // Handle the native asset (XLM)
        return {
          domain: 'stellar.org',
          code: 'XLM',
          issuer: null,
          name: 'Stellar Lumens',
          image: null,
          balance: balance,
        };
      }
      try {
        const {data} = await axiosInstance.get(constant.getAssetList);
        // const assetInfo = data?.data?.find(
        //   (currency: any) => currency.code === assetCode,
        // );
        const assetInfo = data?.data?.find(
          (currency: any) =>
            currency.code === assetCode && currency.issuer === assetIssuer,
        );
        if (!assetInfo) {
          return {
            domain: null,
            code: assetCode,
            issuer: assetIssuer,
            name: assetCode,
            image: null,
            balance: balance,
          };
          // throw new Error(
          //   'Asset information not found in the Stellar Toml file',
          // );
        }
        return {
          domain: assetInfo.domain,
          code: assetInfo.code,
          issuer: assetInfo.issuer,
          name: assetInfo.name ?? assetInfo.code,
          image: assetInfo.image,
          balance: balance,
        };
      } catch (e: any) {
        setDashboardData('loading', false);
        setDashboardData('refreshing', false);
        Log('fetchAllAssets error', e);
      }
    } catch (error) {
      setDashboardData('loading', false);
      setDashboardData('refreshing', false);
      Log('Error fetching asset information:', error);
      throw error;
    }
  };
  const calculateSum = async (assetData: Array<any>) => {
    try {
      const {data} = await axiosInstance.get(constant.coinGeckoCurrency);
      const filterSymbols = data?.filter((item: any, index: number) => {
        if (assetData.some(val => val.code == item.symbol?.toUpperCase())) {
          return {...item};
        }
      });
      let tempSum: Array<number> = [];
      filterSymbols?.map((item: any) => {
        assetData?.map(val => {
          if (val.code == item?.symbol?.toUpperCase()) {
            let balance =
              parseFloat(item?.current_price) * parseFloat(val?.balance);
            tempSum.push(balance);
          }
        });
      });
      const finalBalance = tempSum.reduce(
        (acc: any, asset: any) => acc + parseFloat(asset),
        0,
      );
      Log('finalBalance:', finalBalance);
      setDashboardData('balance', finalBalance?.toFixed(2));
      dispatch(updateBalance(finalBalance?.toFixed(2)?.toString()));
    } catch (error) {
      Log('error coin gecko:', error);
    }
  };
  const onOpenDrawer = () => {
    navigationOpen.openDrawer();
  };

  const onGenerateQR = () => {
    navigation.navigate('receivePayment');
  };

  const onGeneratePayment = () => {
    navigation.navigate('acceptPayment');
  };

  const onHistory = () => {
    navigation.navigate('transaction');
  };

  const onNotification = () => {
    navigation.navigate('notification');
  };

  const onScan = () => {
    navigation.navigate('homeScanner');
  };

  const onClickAsset = (item: DashboardDataProps) => {
    navigation.navigate('assetDetail', {data: item});
  };

  const onAddAsset = () => {
    navigation.navigate('assets', {
      screen: 'addAsset',
    });
  };

  const onSeeMore = () => {
    navigation.navigate('assets');
  };
  const onCopy = () => {
    let copyStr = walletPrivateData?.publicKey
      ? walletPrivateData?.publicKey
      : '';
    Clipboard.setString(copyStr);
    Snackbar('Copied to clipboard !!');
  };
  const onClickWithdraw = () => {};

  const onSell = () => {
    navigation.navigate('sell');
  };

  return {
    onOpenDrawer,
    onGenerateQR,
    onGeneratePayment,
    onNotification,
    onScan,
    dashboardData,
    onAddAsset,
    onSeeMore,
    refreshCall,
    onClickAsset,
    onClickWithdraw,
    walletPrivateData,
    onCopy,
    onSell,
    setDashboardData,
    onRefreshCall,
    onHistory,
  };
};

export default useDashboardController;
