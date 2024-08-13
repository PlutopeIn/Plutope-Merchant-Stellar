import {ImageProps} from 'react-native';

interface UserReducerProps {
  signupDetails?: UserDetailsProps;
  userDetails?: {
    getUser: UserDetailsProps;
    getKybDetails: KybDetailsProps;
    getKycDetails: KycDetailsProps;
    storeDetails: StoreDetailsProps;
    customizeStoreDetails: CustomizeStoreDetails;
  };
  token?: string;
  passcode?: string;
  isVerify?: boolean;
  kybStatus?: string | undefined;
  kycStatus?: string | undefined;
  step?: string | undefined;
  walletPrivateData?: WalletPrivateDetailsProps;
  balance: string;
}
interface UserDetailsProps {
  _id: string | undefined;
  email: string | undefined;
  countryCode: string | undefined;
  mobileNumber: number | undefined;
  secretPhaseKey: string | undefined;
}
interface KybDetailsProps {
  _id: string | undefined;
  country: string | undefined;
  companyName: string | undefined;
  taxId: string | undefined;
  businessId: string | undefined;
  isSubmit: boolean;
}
interface KycDetailsProps {
  _id?: string;
  address?: string;
  backPhoto?: string;
  country?: string;
  createdAt?: string;
  dob?: string;
  documentType?: string;
  firstName?: string;
  frontPhoto?: string;
  isDeleted: false;
  isSubmit: true;
  kycStatus?: string;
  lastName?: string;
  uniqueId?: string;
  updatedAt?: string;
  userId?: string;
}

interface StoreDetailsProps {
  _id: string | undefined;
  businessType: any | undefined;
  category: any | undefined;
  businessName: string | undefined;
  mobileNumber: string | undefined;
  country: string | undefined;
  countryCode: string | undefined;
  city: string | undefined;
  pincode: string | undefined;
  address: string | undefined;
  publicKey: string | undefined;
  secretKey: string | undefined;
}

interface CustomizeStoreDetails {
  _id: string | undefined;
  customFonts: string | undefined;
  colorCode: string | undefined;
  theme: string | undefined;
  logo: string | undefined;
  coverPhoto: string | undefined;
}

interface WalletPrivateDetailsProps {
  publicKey: string | undefined;
  secretKey: string | undefined;
}
