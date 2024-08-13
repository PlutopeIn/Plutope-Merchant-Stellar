export interface image {
  name: string;
  uri: string;
  type: string;
}
export interface kybDetailProps {
  country: string | undefined;
  companyName: string | undefined;
  taxId: string | undefined;
  businessId: string | undefined;
  countryData: Array<DataProps>;
  loading: boolean;
  businessPhoto: string;
  kycKybStatus?: KycKybProps;
}
interface KycKybProps {
  kycStatus: string;
  kybStatus: string;
}
export interface DataProps {
  name: string;
}
export interface ErrorProps {
  countryError: string | undefined;
  companyNameError: string | undefined;
  taxIdError: string | undefined;
  businessIdError: string | undefined;
}
