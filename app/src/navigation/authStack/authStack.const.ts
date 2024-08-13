import screenName from '@navigation/screenName';
import Login from '@screens/auth/login/Login';
import Permissions from '@screens/auth/permissions/Permissions';
import RecoveryPhrase from '@screens/auth/recoveryPhrase/RecoveryPhrase';
import SetStore from '@screens/auth/setStore/SetStore';
import SignUp from '@screens/auth/signUp/SignUp';
import VerifyPhrase from '@screens/auth/verifyPhrase/VerifyPhrase';
import WalletSuccess from '@screens/auth/walletSuccess/WalletSuccess';
import CustomizeStore from '@screens/home/customizeStore/CustomizeStore';
import Kyb from '@screens/home/kyb/Kyb';
import KybProcess from '@screens/home/kybProcess/KybProcess';
import Kyc from '@screens/home/kyc/Kyc';
import SecretPhrase from '@screens/auth/secretPhrase/SecretPhrase';
import BiometricPassword from '@screens/auth/biometricPassword/BiometricPassword';
import GetStarted from '@screens/auth/getStarted/GetStarted';
import SettlementPayment from '@screens/home/settlementPayment/SettlementPayment';
import AmountSuccess from '@screens/home/amountSuccess/AmountSuccess';
import DrawerStack from '@navigation/drawerStack/drawerStack';
import VerifyOtp from '@screens/auth/verifyOtp/VerifyOtp';
import StellarWallet from '@screens/auth/stellarWallet/StellarWallet';
import BackupWallet from '@screens/auth/backupWallet/BackupWallet';
import ReceivePayment from '@screens/drawer/receivePayment/ReceivePayment';
import AcceptPayment from '@screens/drawer/acceptPayment/AcceptPayment';
import Notification from '@screens/drawer/notification/Notification';
import Transaction from '@screens/drawer/transaction/Transaction';
import Security from '@screens/drawer/security/Security';
import HelpSupport from '@screens/drawer/helpSupport/HelpSupport';
import Setting from '@screens/drawer/setting/Setting';
import Assets from '@screens/assets/Assets';
import ForgotPassword from '@screens/auth/forgotPassword/ForgotPassword';
import ResetPassword from '@screens/auth/resetPassword/ResetPassword';
import EditStore from '@screens/drawer/editStore/EditStore';
import EditCustomizeStore from '@screens/drawer/editCustomizeStore/EditCustomizeStore';
import EditDetails from '@screens/drawer/editDetails/EditDetails';
import EditKyb from '@screens/drawer/editKyb/EditKyb';
import EditKyc from '@screens/drawer/editKyc/EditKyc';
import ChangePassword from '@screens/drawer/changePassword/ChangePassword';
import MyQrPayment from '@screens/drawer/myQrPayment/MyQrPayment';
import Scanner from '@screens/drawer/scanner/Scanner';
import RequestPayment from '@screens/drawer/requestPayment/RequestPayment';
import AssetDetail from '@screens/drawer/assetDetail/AssetDetail';
import WebViewScreen from '@screens/drawer/webViewScreen/WebViewScreen';
import Sell from '@screens/drawer/sell/Sell';
import Buy from '@screens/drawer/buy/Buy';
import Wallet from '@screens/drawer/wallet/Wallet';
import HomeScanner from '@screens/drawer/homeScanner/HomeScanner';
import CmsDetail from '@screens/auth/cmsDetail/CmsDetail';
import OnfidoVerify from '@screens/home/onfidoVerification/OnfidoVerification';
import TransactionDetail from '@screens/drawer/transactionDetail/TransactionDetail';

const authStackScreens = [
  {
    name: screenName.getStarted,
    component: GetStarted,
  },
  {
    name: screenName.login,
    component: Login,
  },
  {
    name: screenName.signUp,
    component: SignUp,
  },
  {
    name: screenName.verifyOtp,
    component: VerifyOtp,
  },
  {
    name: screenName.stellarWallet,
    component: StellarWallet,
  },
  {
    name: screenName.backupWallet,
    component: BackupWallet,
  },
  {
    name: screenName.permissions,
    component: Permissions,
  },
  {
    name: screenName.secretPhrase,
    component: SecretPhrase,
  },
  {
    name: screenName.recoveryPhrase,
    component: RecoveryPhrase,
  },
  {
    name: screenName.verifyPhrase,
    component: VerifyPhrase,
  },
  {
    name: screenName.biometricPassword,
    component: BiometricPassword,
  },
  {
    name: screenName.walletSuccess,
    component: WalletSuccess,
  },
  {
    name: screenName.setStore,
    component: SetStore,
  },
  {
    name: screenName.customizeStore,
    component: CustomizeStore,
  },
  {
    name: screenName.kybProcess,
    component: KybProcess,
  },
  {
    name: screenName.kyc,
    component: Kyc,
  },
  {
    name: screenName.kyb,
    component: Kyb,
  },
  {
    name: screenName.settlementPayment,
    component: SettlementPayment,
  },
  {
    name: screenName.amountSuccess,
    component: AmountSuccess,
  },
  {
    name: screenName.drawer,
    component: DrawerStack,
  },
  {
    name: screenName.receivePayment,
    component: ReceivePayment,
  },
  {
    name: screenName.acceptPayment,
    component: AcceptPayment,
  },
  {
    name: screenName.notification,
    component: Notification,
  },
  {
    name: screenName.transaction,
    component: Transaction,
  },
  {
    name: screenName.helpSupport,
    component: HelpSupport,
  },
  {
    name: screenName.security,
    component: Security,
  },
  {
    name: screenName.setting,
    component: Setting,
  },
  {
    name: screenName.assets,
    component: Assets,
  },
  {
    name: screenName.forgotPassword,
    component: ForgotPassword,
  },
  {
    name: screenName.resetPassword,
    component: ResetPassword,
  },
  {
    name: screenName.editStore,
    component: EditStore,
  },
  {
    name: screenName.editCustomizeStore,
    component: EditCustomizeStore,
  },
  {
    name: screenName.editDetails,
    component: EditDetails,
  },
  {
    name: screenName.editKyb,
    component: EditKyb,
  },
  {
    name: screenName.editKyc,
    component: EditKyc,
  },
  {
    name: screenName.changePassword,
    component: ChangePassword,
  },
  {
    name: screenName.myQrPayment,
    component: MyQrPayment,
  },
  {
    name: screenName.scanner,
    component: Scanner,
  },
  {
    name: screenName.requestPayment,
    component: RequestPayment,
  },
  {
    name: screenName.assetDetail,
    component: AssetDetail,
  },
  {
    name: screenName.webViewScreen,
    component: WebViewScreen,
  },
  {
    name: screenName.sell,
    component: Sell,
  },
  {
    name: screenName.buy,
    component: Buy,
  },
  {
    name: screenName.wallet,
    component: Wallet,
  },
  {
    name: screenName.homeScanner,
    component: HomeScanner,
  },
  {
    name: screenName.cmsDetail,
    component: CmsDetail,
  },
  {
    name: screenName.onfidoVerify,
    component: OnfidoVerify,
  },
  {
    name: screenName.transactionDetail,
    component: TransactionDetail,
  },
];
export default authStackScreens;
