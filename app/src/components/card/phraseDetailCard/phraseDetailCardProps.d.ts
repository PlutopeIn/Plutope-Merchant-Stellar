import {createWalletProps} from '@screens/auth/walletSuccess/walletSuccessProps';

export interface PropType {
  item: string;
  index: number;
  onClick?: () => void;
  disabled?: boolean;
}
