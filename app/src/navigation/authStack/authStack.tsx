import React, {useMemo} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {createWalletProps} from '@screens/auth/walletSuccess/walletSuccessProps';
import authStackScreens from './authStack.const';
import screenName from '@navigation/screenName';
import {useAppSelector} from '@utility/useReduxHooks';

export type AuthParams = {
  getStarted: undefined;
  login: undefined;
  signUp: undefined;
  verifyOtp: {screen: string; email?: string | undefined} | undefined;
  permissions: undefined;
  secretPhrase: undefined;
  recoveryPhrase: {pharseKey: string; id: string} | undefined;
  verifyPhrase: {minemonic: string};
  biometricPassword: undefined;
  walletSuccess: {data: createWalletProps} | undefined;
  setStore: undefined;
  customizeStore: undefined;
  kybProcess: undefined;
  kyc: {kybKycStatusApiCall: () => void} | undefined;
  kyb: {kybKycStatusApiCall: () => void} | undefined;
  settlementPayment: undefined;
  amountSuccess: {type: string} | undefined;
  drawer: undefined;
  stellarWallet: undefined;
  backupWallet: undefined;
  receivePayment: {screen?: 'receiveAsset'; data?: any} | undefined;
  acceptPayment: undefined;
  notification: undefined;
  transaction: undefined;
  helpSupport: undefined;
  security: undefined;
  setting: undefined;
  assets: {screen?: string} | undefined;
  forgotPassword: undefined;
  resetPassword: {id: string | undefined} | undefined;
  editStore: undefined;
  editCustomizeStore: undefined;
  editDetails: undefined;
  editKyb: undefined;
  editKyc: undefined;
  changePassword: undefined;
  myQrPayment: undefined;
  scanner: {data?: any} | undefined;
  requestPayment: undefined;
  assetDetail: {data?: any} | undefined;
  webViewScreen: {title?: string; link: string} | undefined;
  sell: undefined;
  buy: undefined;
  wallet: undefined;
  homeScanner: undefined;
  cmsDetail: {title: string; screen: string} | undefined;
  onfidoVerify: {userId?: string};
  transactionDetail: {details: NotificationListProps};
};

export type AuthNavigationProps = StackNavigationProp<AuthParams>;

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  const {token, step} = useAppSelector(state => state.userReducer);

  const route = () => {
    /* Navigation auth */
    if (token) {
      return screenName.drawer;
    } else {
      switch (step) {
        case '2':
          return screenName.setStore;
        case '3':
          return screenName.customizeStore;
        case '4':
          return screenName.kybProcess;
        default:
          return screenName.getStarted;
      }
    }
  };
  const routeName = useMemo(() => route(), [token]);
  return (
    <Stack.Navigator
      initialRouteName={routeName}
      detachInactiveScreens={true}
      screenOptions={{
        cardOverlayEnabled: true,
        headerShown: false,
      }}>
      {authStackScreens?.map(screen => {
        return (
          <Stack.Screen
            key={screen?.name}
            name={screen?.name}
            component={screen?.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default AuthStack;
