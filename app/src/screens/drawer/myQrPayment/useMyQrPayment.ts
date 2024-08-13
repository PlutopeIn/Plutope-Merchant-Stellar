import {useAppSelector} from '@utility/useReduxHooks';
import {RootState} from '@redux/type';
import Clipboard from '@react-native-clipboard/clipboard';
import {Share} from 'react-native';
import Snackbar from '@utility/snackbar';

const useMyQrPaymentController = () => {
  const {walletPrivateData, userDetails} = useAppSelector(
    state => state.userReducer,
  );

  const onClickShare = () => {
    Share.share({
      message: `web+stellar:pay?destination=${walletPrivateData?.publicKey}&asset_code=XLM&asset_issuer=&amount=`,
    });
  };
  const onClickCopy = () => {
    let copyStr = walletPrivateData?.publicKey
      ? walletPrivateData?.publicKey
      : '';
    Clipboard.setString(copyStr);
    Snackbar('Copied to clipboard !!');
  };

  return {onClickShare, onClickCopy, walletPrivateData, userDetails};
};

export default useMyQrPaymentController;
