import {Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {PropType} from './drawerCardProps';
import styles from './drawerCard.style';

const DrawerCard: React.FC<PropType> = ({item, index, onClick}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {marginLeft: item?.label == 'Delete Account' ? 5 : 0},
      ]}
      activeOpacity={0.7}
      onPress={onClick}>
      <item.image />
      <Text allowFontScaling={false} style={styles.labelText}>
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(DrawerCard);
