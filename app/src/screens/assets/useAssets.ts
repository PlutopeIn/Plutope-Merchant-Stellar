import {AuthNavigationProps, AuthParams} from '@navigation/authStack/authStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootState} from '@redux/type';
import {useSelector} from 'react-redux';
//@ts-ignore
import StellarSdk from '@pigzbe/react-native-stellar-sdk';
import {axiosInstance} from '@api/api';
import constant from '@config/constant';
import {useEffect} from 'react';
import {useResettableState} from '@hooks/useResettableState';
import {AssetDataProps, AssetProps} from './assetsProps';
import Log from '@utility/log';
import Snackbar from '@utility/snackbar';
import axios from 'axios';

const useAssetsController = () => {
  const route = useRoute<RouteProp<AuthParams, 'assets'>>();
  const navigation = useNavigation<AuthNavigationProps>();
  const {walletPrivateData} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const url =
    constant.mode == 'testnet' ? constant.testnetURL : constant.mainnetURL;
  const [assetData, setAssetData, resetState, updateState] =
    useResettableState<AssetProps>({
      loading: false,
      load: false,
      refreshing: false,
      assetList: [],
      staticAssetList: [],
      search: '',
    });

  useEffect(() => {
    if (route?.params?.screen == 'addAsset') {
      fetchAllAssets();
    } else {
      fetchMyAssets();
    }
  }, []);

  const refreshCall = () => {
    setAssetData('refreshing', true);
    if (route?.params?.screen == 'addAsset') {
      fetchAllAssets();
    } else {
      fetchMyAssets();
    }
  };

  const onSearchCall = (text: string) => {
    if (route?.params?.screen == 'addAsset') {
      searchByAsset(text);
    } else {
      searchByName(text);
    }
  };

  const searchByName = (text: string) => {
    setAssetData('search', text);
    const filterData = assetData?.staticAssetList?.filter((item: any) => {
      return item?.name.toUpperCase().indexOf(text.toUpperCase()) !== -1;
    });
    setAssetData('assetList', filterData);
  };

  const searchByAsset = async (text: string) => {
    // #region Start integrating searchByAsset api
    setAssetData('search', text);
    try {
      const {data} = await axios.get(
        `${constant.searchAssetURL}${constant.mode}/asset?search=${text}`,
      );
      const domains = data?._embedded?.records
        .filter((asset: any) => asset.domain)
        .map((asset: any) => asset);
      const temp = domains.map((item: any) => {
        const [assetCode, issuer] = item?.asset.split('-');
        return {
          domain: item?.domain,
          code: assetCode,
          issuer: issuer,
          name: assetCode,
          image: null,
          balance: '0',
        };
      });
      Log('searchByAsset success', JSON.stringify(temp));
      if (text?.length > 0) {
        setAssetData('assetList', temp);
      } else {
        setAssetData('assetList', assetData?.staticAssetList);
      }
    } catch (e: any) {
      Log('searchByAsset error', e);
    }
    // #region End integrating searchByAsset api
  };

  const onBackCall = () => {
    resetState();
    navigation.goBack();
  };

  const fetchMyAssets = async () => {
    // #region Start integrating fetchMyAssets api
    setAssetData('loading', true);
    try {
      const server = new StellarSdk.Server(url);
      const account = await server.loadAccount(walletPrivateData?.publicKey);
      //HitenSir: GC6NYP6JQCDAYGMFR3S6MSQ7IG3RAWFAWTEQLOLZWKACTOO3CCE2LHM7
      const balances = account.balances;
      // Fetch asset information for each asset in the array
      await Promise.all(
        balances.map((asset: any) =>
          fetchAssetInfo(asset.asset_code, asset.asset_issuer, asset.balance),
        ),
      )
        .then(assetInfos => {
          updateState({
            ...assetData,
            loading: false,
            load: false,
            refreshing: false,
            assetList: assetInfos,
            staticAssetList: assetInfos?.reverse(),
          });
        })
        .catch(e => {
          setAssetData('loading', false);
          setAssetData('refreshing', false);
          Log('Error fetching asset information:', e);
        });
    } catch (e) {
      setAssetData('loading', false);
      setAssetData('refreshing', false);
      Log('Error loading balance or fetching asset information:', e);
    }
    // #region End integrating fetchMyAssets api
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
        Log('fetchAllAssets error', e);
      }
    } catch (error) {
      Log('Error fetching asset information:', error);
      throw error;
    }
  };

  const fetchAllAssets = async () => {
    // #region Start integrating fetchAllAssets api
    setAssetData('loading', true);
    try {
      const {data} = await axiosInstance.get(constant.getAssetList);
      try {
        const server = new StellarSdk.Server(url);
        const account = await server.loadAccount(walletPrivateData?.publicKey);
        const assetCodes = account.balances
          .map((item: any) => item.asset_code)
          .filter((code: any) => code !== undefined);
        const filteredData = data?.data.filter(
          (item: any) => !assetCodes.includes(item.code),
        );
        updateState({
          ...assetData,
          loading: false,
          load: false,
          refreshing: false,
          assetList: filteredData,
          staticAssetList: filteredData,
        });
      } catch (e) {
        setAssetData('loading', false);
        setAssetData('refreshing', false);
        Log('Error loading balance or fetching asset information:', e);
      }
    } catch (e: any) {
      setAssetData('loading', false);
      setAssetData('refreshing', false);
      Log('fetchAllAssets error', e);
    }
    // #region End integrating fetchAllAssets api
  };

  const onClickAddAssets = (item: AssetDataProps) => {
    setAssetData('load', true);
    // #region Start integrating addAssets api
    var server = new StellarSdk.Server(url);
    // Keys for accounts to issue and receive the existing asset
    var receivingKeys = StellarSdk.Keypair.fromSecret(
      walletPrivateData?.secretKey,
    );
    //HitenSir: SCHHXPB76AY4ZB4MJUGKSM62LIKC3GX7NQS6KKKTHBODCUZAHANSYDOB
    // Define the asset code and the issuer's public key
    var assetCode = item?.code; // Replace with your actual asset code
    var issuerPublicKey = item?.issuer; // Replace with actual issuer's public key
    // Create an object to represent the existing asset
    var existingAsset = new StellarSdk.Asset(assetCode, issuerPublicKey);
    // First, the receiving account must trust the asset
    server
      .loadAccount(receivingKeys.publicKey())
      .then(function (receiver: any) {
        var transaction = new StellarSdk.TransactionBuilder(receiver, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase:
            constant.mode == 'testnet'
              ? StellarSdk.Networks.TESTNET
              : StellarSdk.Networks.PUBLIC,
        })
          // The `changeTrust` operation creates (or alters) a trustline
          .addOperation(
            StellarSdk.Operation.changeTrust({
              asset: existingAsset,
              limit: '1000',
            }),
          )
          .setTimeout(100)
          .build();
        transaction.sign(receivingKeys);
        return server.submitTransaction(transaction);
      })
      .then((response: any) => {
        setAssetData('load', false);
        navigation.goBack();
      })
      .catch(function (error: any) {
        setAssetData('load', false);
        Snackbar('Something went wrong');
        Log('Add Assets Error!', error);
      });
    // #region End integrating addAssets api
  };

  const onClickAsset = (item: AssetDataProps) => {
    // console.log('test:::', item);
    navigation.navigate('assetDetail', {data: item});
  };

  return {
    route,
    assetData,
    onClickAddAssets,
    onSearchCall,
    refreshCall,
    onClickAsset,
    onBackCall,
  };
};

export default useAssetsController;
