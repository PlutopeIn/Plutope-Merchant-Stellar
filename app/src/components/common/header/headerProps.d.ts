import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface HeaderProps {
  title?: string;
  rightIcon?: React.ComponentType;
  onRightIcon?: () => void;
  rightText?: string;
  onRightText?: () => void;
  rightTextStyle?: StyleProp<TextStyle>;
  headerTitle?: string;
  detailText?: string;
  rightIconStyle?: StyleProp<ViewStyle>;
  onBack?: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  leftIconColor?: boolean;
  style?: ViewStyle
}
