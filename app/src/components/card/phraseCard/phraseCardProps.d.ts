import {createWalletProps} from '@screens/auth/walletSuccess/walletSuccessProps';

export interface PropType {
  item?: string;
  index: number;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
}
