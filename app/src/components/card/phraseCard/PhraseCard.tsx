import {Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import styles from './phraseCard.style';
import {PropType} from './phraseCardProps';

const PhraseCard: React.FC<PropType> = ({item, index, onClick, disabled}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.parentView}
        disabled={disabled}
        activeOpacity={0.6}
        onPress={onClick}>
        <Text allowFontScaling={false} style={styles.numberText}>
          {index + 1}.
        </Text>
        <Text allowFontScaling={false} style={styles.labelText}>
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(PhraseCard);
