import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import walletSuccessController from './useWalletSuccess';
import styles from './walletSuccess.style';
import {CustomStatusBar, Header} from '@components';
import imageIndex from '@imageIndex';
import {SuccessCard} from '@card';

const WalletSuccess: React.FC = () => {
  const {onWalletPress, address} = walletSuccessController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Wallet Success" />
      <View style={styles.subContainer}>
        <SuccessCard
          title="MultiChain Wallet Successfully Created"
          image={imageIndex.wallet}
          detail="Wallet Address"
          arrowImage
          onPress={onWalletPress}
        />
        {address && (
          <View style={styles.addressContainer}>
            <Text allowFontScaling={false} style={styles.addressText}>
              {address}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default WalletSuccess;
