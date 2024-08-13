import {StyleProp, TextInputProps, ViewStyle} from 'react-native';

export interface SearchInputProps extends TextInputProps {
  value?: string;
  setValue?: (value: string) => void;
  placeholderTextColor?: string;
  fill?: string;
  closeFill?: string;
  onPress?: () => void;
  closeIcon?: any;
  containerStyle?: StyleProp<ViewStyle>;
}
