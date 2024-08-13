import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {Button, CustomStatusBar} from '@components';
import styles from './amountSuccess.style';
import useAmountSuccess from './useAmountSuccess';
import imageIndex from '@imageIndex';

const AmountSuccess: React.FC = () => {
  const {credited, onTransferred, onCredited} = useAmountSuccess();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      {credited ? (
        <View style={styles.subContainer}>
          <Image source={imageIndex.success} style={styles.bookImage} />
          <Text allowFontScaling={false} style={styles.availableText}>
            Amount transferred
          </Text>
          <Button
            title="Back"
            onPress={onTransferred}
            containerStyle={styles.withdrawButtonContainer}
          />
        </View>
      ) : (
        <View style={styles.subContainer}>
          <Image source={imageIndex.success} style={styles.bookImage} />
          <Text allowFontScaling={false} style={styles.availableText}>
            Amount credited to bank!
          </Text>
          <Button
            title="Back"
            onPress={onCredited}
            containerStyle={styles.withdrawButtonContainer}
          />
        </View>
      )}
    </View>
  );
};

export default AmountSuccess;
