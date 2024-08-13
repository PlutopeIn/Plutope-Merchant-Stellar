export interface scannerProps {
  data: string;
  address: string;
  amount: string;
  issuer: string;
  isOpen: boolean;
  loading: boolean;
  code: string;
  memo: string;
  flashMode?: boolean;
}

export interface ErrorProps {
  addressError: string | undefined;
  amountError: string | undefined;
  memoError: string | undefined;
}
