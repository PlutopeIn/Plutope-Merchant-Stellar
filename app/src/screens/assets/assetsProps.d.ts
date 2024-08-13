export interface AssetProps {
  assetList: AssetDataProps | any;
  loading: boolean;
  load: boolean;
  refreshing: boolean;
  staticAssetList: AssetDataProps | any;
  search: string;
}
export interface AssetDataProps {
  domain: string | null;
  code: string;
  issuer: string | null;
  name: string;
  image: string | null;
  balance: string;
}
