import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface DropdownProps {
  placeholder: string;
  value?: string;
  onPress: (item: DataProps) => void;
  data: DataProps[];
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  touchableContainer?: StyleProp<ViewStyle>;
  dropdownContainer?: StyleProp<ViewStyle>;
  dropDownText?: StyleProp<TextStyle>;
  leftIcon?: React.ComponentType;
}

interface DataProps {
  id: number;
  title: string;
}
