import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import styles from './homeHeader.style';
import SvgIndex from '@svgIndex';

const HomeHeader: React.FC<any> = ({onNotificationPress}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menu} activeOpacity={0.7}>
        <SvgIndex.menu />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.notification}
        activeOpacity={0.7}
        onPress={onNotificationPress}>
        <SvgIndex.notification />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon} activeOpacity={0.7}>
        <Text allowFontScaling={false} style={styles.text}>
          ?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profile} activeOpacity={0.7}>
        <SvgIndex.profile />
      </TouchableOpacity>
    </View>
  );
};

export default memo(HomeHeader);
