import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';
import {PropType} from './notificationCardProps';
import styles from './notificationCard.style';
import imageIndex from '@imageIndex';

const NotificationCard: React.FC<PropType> = ({item, index, onClick}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onClick}>
      <Image style={styles.image} source={imageIndex.asset} />
      <View style={styles.infoContainer}>
        <Text allowFontScaling={false} style={styles.labelText}>
          {item?.title}
        </Text>
        <Text allowFontScaling={false} style={styles.timeText}>
          {item?.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(NotificationCard);
