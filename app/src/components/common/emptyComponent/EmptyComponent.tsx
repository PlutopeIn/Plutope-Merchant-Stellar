import React, {memo} from 'react';
import {EmptyProps} from './emptyComponentProps';
import {Text, View} from 'react-native';
import styles from './emptyComponent.style';

const EmptyComponent: React.FC<EmptyProps> = ({title}) => {
  return (
    <View style={styles.emptyView}>
      <Text style={styles.emptyText}>{title}</Text>
    </View>
  );
};

export default memo(EmptyComponent);
