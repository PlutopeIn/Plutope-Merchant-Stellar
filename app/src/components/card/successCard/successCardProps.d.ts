import {createWalletProps} from '@screens/auth/walletSuccess/walletSuccessProps';

export interface PropType {
  title?: string;
  image?: ImageSourcePropType | undefined;
  detail?: string;
  arrowImage?: boolean;
  onPress?: () => void;
}
