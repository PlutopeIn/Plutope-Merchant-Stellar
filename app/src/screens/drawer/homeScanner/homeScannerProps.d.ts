export interface scannerProps {
  data: string;
  visible: boolean;
  address: string;
  amount: string;
  loading: boolean;
  sendAmount: string | any;
  memo: string | undefined;
  currency: string;
  issuer: string | undefined;
  assetList: AssetDataProps | any;
  staticAssetList: AssetDataProps | any;
  amountError: string | undefined;
  flashMode?: boolean;
  code: string;
}

export interface ErrorProps {
  sendAmountError: string | undefined;
  memoError: string | undefined;
}

export interface AssetDataProps {
  domain: string | null;
  code: string;
  issuer: string | null;
  name: string;
  image: string | null;
  balance: string;
}
