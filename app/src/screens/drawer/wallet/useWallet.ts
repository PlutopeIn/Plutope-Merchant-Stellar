import {RootState} from '@redux/type';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from '@utility/snackbar';
const useWallet = () => {
  const {walletPrivateData} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const message = `The secret key represents private information and is used to encrypt data and sign transactions on the Stellar network.\n\nIt provide that you own your Stellar wallet and gives full access to your funds.\n\nUse caution and only share your keys with trusted services`;
  const onRevealKey = () => {
    setIsVisible(!isVisible);
  };
  const onCopy = () => {
    let copyStr = walletPrivateData?.secretKey
      ? walletPrivateData?.secretKey
      : '';
    Clipboard.setString(copyStr);
    Snackbar('Copied to clipboard !!');
  };

  return {walletPrivateData, isVisible, onRevealKey, onCopy, message};
};

export default useWallet;
