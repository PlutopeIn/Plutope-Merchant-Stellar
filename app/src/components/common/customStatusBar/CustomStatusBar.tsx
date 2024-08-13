import React, {memo} from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomStatusBarProps} from './customStatusBarProps';
import color from '@theme/color';

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor,
  barStyle,
  hidden,
  translucent,
  containerStyle,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {height: insets.top, backgroundColor: backgroundColor ?? color.white},
        containerStyle,
      ]}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor ?? color.white}
        barStyle={barStyle ?? 'dark-content'}
        translucent={translucent}
        hidden={hidden}
      />
    </View>
  );
};

export default memo(CustomStatusBar);
