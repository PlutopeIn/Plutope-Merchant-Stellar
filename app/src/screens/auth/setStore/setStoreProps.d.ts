export interface setStoreDetailProps {
  type: DropdownProps | undefined;
  category: DropdownProps | undefined;
  businessName: string | undefined;
  contact: string;
  address: string | undefined;
  city: string | undefined;
  pincode: string | undefined;
  selectCountryCode: string;
  mobileLength: number;
  country: string;
  countryData: Array<DataProps>;
  businessTypeData: Array<BusinessTypeDataProps>;
  categoryTypeData: Array<BusinessTypeDataProps>;
  loading: boolean;
  refreshing: boolean;
}
interface DropdownProps {
  id: number;
  title: string;
}
export interface ErrorObject {
  typeError: string | undefined;
  categoryError: string | undefined;
  businessError: string | undefined;
  contactError: string | undefined;
  countryError: string | undefined;
  cityError: string | undefined;
  pincodeError: string | undefined;
  addressError: string | undefined;
}

export interface DataProps {
  name: string;
}

export interface BusinessTypeDataProps {
  id: number;
  title: string;
}
