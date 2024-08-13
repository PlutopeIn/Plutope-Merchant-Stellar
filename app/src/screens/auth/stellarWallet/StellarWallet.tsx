import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import styles from './stellarWallet.style';
import {Button, CustomStatusBar, Header} from '@components';
import useStellarWallet from './useStellarWallet';
import SvgIndex from '@svgIndex';

const {height} = Dimensions.get('window');
const StellarWallet: React.FC = () => {
  const {onCreate, onConnect} = useStellarWallet();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header />
      <SvgIndex.oneWallet width={'100%'} height={height / 2} />
      <View style={styles.subContainer}>
        <Text allowFontScaling={false} style={styles.stellarText}>
          Stellar Wallet
        </Text>
        <Text allowFontScaling={false} style={styles.detailsText}>
          Create a new Stellar wallet or connect the wallet you already have.{' '}
        </Text>
      </View>
      <Button
        title="Create Stellar Wallet"
        onPress={onCreate}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Connect Stellar Wallet"
        onPress={onConnect}
        titleStyle={styles.connectText}
        containerStyle={styles.connectContainer}
      />
    </View>
  );
};

export default StellarWallet;
