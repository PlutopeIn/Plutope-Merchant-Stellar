import {StatusBarProps, StyleProp, ViewStyle} from 'react-native';

export interface CustomStatusBarProps extends StatusBarProps {
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
