export interface DashboardProps {
  assetData: DashboardDataProps | any;
  loading: boolean;
  refreshing: boolean;
  balance: string;
  kycKybStatus?: KycKybProps;
  kycModal: boolean;
  kybModal: boolean;
  modalRefreshing: boolean;
}
interface KycKybProps {
  kycStatus: string;
  kybStatus: string;
}
export interface DashboardDataProps {
  domain: string | null;
  code: string;
  issuer: string | null;
  name: string;
  image: string | null;
  balance: string;
}
