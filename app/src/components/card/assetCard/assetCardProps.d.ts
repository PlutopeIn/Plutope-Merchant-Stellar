export interface PropType {
  item: AssetDetailsProps;
  index: number;
  onClick?: () => void;
  screen?: string;
  onAddAssets?: () => void;
  isLoading?: boolean;
}

interface AssetDetailsProps {
  domain: string | null;
  anchor_asset: string;
  anchor_asset_type: string;
  code: string;
  issuer: string | null;
  name: string;
  image: string | null;
  balance: string;
}
