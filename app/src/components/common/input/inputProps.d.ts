import {
  ImageSourcePropType,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface InputProps {
  value: string | undefined;
  onChangeText?: (value: string) => void;
  placeholder: string;
  mainContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputProps?: TextInputProps;
  error?: string | null;
  rightIcon?: React.ComponentType;
  spinner?: boolean;
  leftIcon?: React.ComponentType;
  hideText?: boolean;
  secureText?: boolean;
  onRightClick?: () => void;
  rightText?: string | undefined;
}
