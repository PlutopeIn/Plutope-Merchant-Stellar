export interface receivePaymentProps {
  visible: boolean;
  success: boolean;
  qrCodeData: string;
  amount: string | undefined;
  finalAmount: string | undefined;
  currency: string | undefined;
  issuer: string | undefined;
  assetList: AssetDataProps | any;
  amountError: string | undefined;
  currencyError: string | undefined;
}
export interface AssetDataProps {
  domain: string | null;
  code: string;
  issuer: string | null;
  name: string;
  image: string | null;
  balance: string;
}
