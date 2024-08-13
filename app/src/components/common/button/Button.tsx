import React, {memo} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ButtonProps} from './buttonProps';
import style from './button.style';
import color from '@theme/color';

const Button: React.FC<ButtonProps> = ({
  title,
  containerStyle,
  titleStyle,
  onPress,
  loading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled ?? loading}
      style={[
        style.container,
        {opacity: loading ?? disabled ? 0.5 : 1},
        containerStyle,
      ]}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}>
      {loading ? (
        <ActivityIndicator size="small" color={color.white} />
      ) : (
        <Text allowFontScaling={false} style={[style.title, titleStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
