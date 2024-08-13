import {Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {PropType} from './phraseDetailCardProps';
import styles from './phraseDetailCard.style';

const PhraseDetailCard: React.FC<PropType> = ({
  item,
  index,
  onClick,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={styles.labelTextView}
      disabled={disabled}
      activeOpacity={0.6}
      onPress={onClick}>
      <Text allowFontScaling={false} style={styles.labelTextStyle}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(PhraseDetailCard);
