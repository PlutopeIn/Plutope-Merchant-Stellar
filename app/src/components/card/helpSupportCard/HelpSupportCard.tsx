import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {PropType} from './helpSupportCardProps';
import styles from './helpSupportCard.style';
import SvgIndex from '@svgIndex';

const HelpSupportCard: React.FC<PropType> = ({
  item,
  index,
  onPress,
  showDetail,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.subContainer}>
        <Text style={styles.titleText}>{item?.title}</Text>
        <SvgIndex.add />
      </TouchableOpacity>
      {showDetail && (
        <Text style={styles.detailsText}>{item?.description}</Text>
      )}
      <View style={styles.borderContainer} />
    </View>
  );
};

export default memo(HelpSupportCard);
