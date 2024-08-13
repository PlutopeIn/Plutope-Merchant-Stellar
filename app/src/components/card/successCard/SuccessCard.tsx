import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {PropType} from './successCardProps';
import styles from './successCard.style';
import imageIndex from '@imageIndex';

const SuccessCard: React.FC<PropType> = ({
  title,
  image,
  detail,
  arrowImage,
  onPress,
}) => {
  return (
    <View>
      <Text allowFontScaling={false} style={styles.chainSuccess}>
        {title}
      </Text>
      <Image source={image} style={styles.walletImage} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.walletContainer}
        onPress={onPress}>
        <Text allowFontScaling={false} style={styles.walletText}>
          {detail}
        </Text>
        {arrowImage && (
          <Image source={imageIndex.upArrow} style={styles.arrowImage} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default memo(SuccessCard);
