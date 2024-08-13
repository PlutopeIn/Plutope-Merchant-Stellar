export interface kycDetailProps {
  firstName: string | undefined;
  lastName: string | undefined;
  birthDate: string | undefined;
  address: string | undefined;
  country: string | undefined;
  countryData: Array<DataProps>;
  name: string | undefined;
  uniqueId: string | undefined;
  documentType: string | undefined;
  frontImage: image | null;
  backImage: image | null;
  loading: boolean;
  kycKybStatus?: KycKybProps;
}
interface KycKybProps {
  kycStatus: string;
  kybStatus: string;
}
export interface ErrorObject {
  firstNameError: string | undefined;
  lastNameError: string | undefined;
  birthDateError: string | undefined;
  addressError: string | undefined;
  countryError: string | undefined;
  nameError: string | undefined;
  uniqueIdError: string | undefined;
  documentError: string | undefined;
  imageError: string | undefined;
}

export interface image {
  name: string;
  uri: string;
  type: string;
}

export interface DataProps {
  name: string;
}
