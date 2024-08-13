import {StyleProp, ViewStyle} from 'react-native';

export interface userStateProps {
  search: string;
  openCodeModal: boolean;
  dropdownData: Array<DataProps>;
}
export interface filterDataProps {
  title: string;
  code: string;
  diallingCode: string;
}

export interface DropdownProps {
  data: Array<DataProps>;
  containerStyle?: StyleProp<ViewStyle>;
  inputViewContainer?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  value?: string;
  placeholder?: string;
  error?: string;
  setCountryName: (name: string) => void;
  isSelectedItem?: (issuer: string) => void;
  leftIcon?: boolean;
  searchLabel?: string;
  isWholeItem?: boolean;

  disabled?: boolean;
}

export interface DataProps {
  name: string;
  issuer?: string;
}
