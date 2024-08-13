export interface RequestPaymentProps {
  email: string | undefined;
  amount: string | undefined;
  currency: string | undefined;
  issuer: string | undefined;
  message: string | undefined;
  assetList: AssetDataProps | any;
  load: boolean;
  memo?: string;
}

export interface AssetDataProps {
  domain: string | null;
  code: string;
  issuer: string | null;
  name: string;
  image: string | null;
  balance: string;
}

export interface ErrorProps {
  emailError: string | undefined;
  amountError: string | undefined;
  currencyError: string | undefined;
}
