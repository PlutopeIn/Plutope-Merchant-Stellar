export interface CmsProps {
  data: DataProps | any;
  loading: boolean;
  refreshing: boolean;
}

export interface DataProps {
  privacyPolicy: {
    description: string;
  };
  termsAndCondition: {
    description: string;
  };
}
