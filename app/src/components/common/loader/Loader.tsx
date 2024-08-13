import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import color from '@theme/color';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color.blueShade} size={'large'} />
    </View>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
