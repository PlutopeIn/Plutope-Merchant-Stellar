import {TouchableOpacity, View} from 'react-native';
import {CustomSwitchProps} from './customSwitch.interface';
import {style} from './customSwitch.style';
import {memo} from 'react';
import color from '@theme/color';

const CustomSwitch: React.FC<CustomSwitchProps> = ({value, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View
        style={[
          style.switchStyle,
          {backgroundColor: value ? color.slateGreen : color.slateGray},
        ]}>
        <TouchableOpacity
          style={[
            style.thumbStyle,
            {
              alignSelf: value ? 'flex-end' : 'flex-start',
            },
          ]}
          activeOpacity={0.5}
          onPress={onPress}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(CustomSwitch);
