import {Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import SvgIndex from '@svgIndex';
import styles from './settingCard.style';
import {PropType} from './settingCardProps';

const SettingCard: React.FC<PropType> = ({item, index, onClick}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {borderTopWidth: index == 0 ? 0 : 1}]}
      activeOpacity={0.7}
      onPress={onClick}>
      <Text allowFontScaling={false} style={styles.labelText}>
        {item?.label}
      </Text>
      <SvgIndex.nextArrow />
    </TouchableOpacity>
  );
};

export default memo(SettingCard);
