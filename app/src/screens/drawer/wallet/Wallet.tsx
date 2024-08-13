import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import React from 'react';
import {Button, CustomStatusBar, Header} from '@components';
import styles from './wallet.style';
import useWallet from './useWallet';
import SvgIndex from '@svgIndex';
import font from '@theme/font';
import color from '@theme/color';
import imageIndex from '@imageIndex';

const Wallet = () => {
  const {walletPrivateData, isVisible, onRevealKey, onCopy, message} =
    useWallet();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header
        title="Wallet"
        detailText="Do not share your Secret Key with anyone!"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.labelText}>Reveal Your Secret Key</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{paddingHorizontal: 15}}
            onPress={onCopy}>
            <SvgIndex.copy height={40} width={40} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={onRevealKey}>
            {isVisible ? (
              <SvgIndex.eye height={20} width={20} />
            ) : (
              <SvgIndex.eyeSlash height={20} width={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.secretText}>
            {isVisible
              ? walletPrivateData?.secretKey
              : '******************************'}
          </Text>
        </View> */}
        <Text
          style={{
            fontFamily: font.interLight,
            fontSize: 20,
            color: color.black,
            fontWeight: 'bold',
          }}>
          Stellar secret key
        </Text>
        <Text
          style={{
            fontFamily: font.interLight,
            fontSize: 14,
            color: color.black,
            marginTop: 10,
          }}>
          {message}
        </Text>
        <View style={styles.bottomContainer}>
          <Button title="Reveal Secret Key" onPress={onRevealKey} />
        </View>
        <Modal visible={isVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.keepLabel}>Keep your secret key secure</Text>
              <Text style={styles.description}>
                You are responsible for storing copies of your secret key
                securely after exporting the key outside of Stellar
              </Text>
              <View style={styles.warningMessage}>
                <Image source={imageIndex.warn} style={styles.imageStyle} />
                <View style={styles.warnContent}>
                  <Text style={styles.warnLabel}>
                    Secret key gives full access to your funds
                  </Text>
                  <Text style={styles.warnDesc}>
                    Use caution and only share your keys with trusted services.
                  </Text>
                </View>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.secretText}>
                  {walletPrivateData?.secretKey}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.copyBtn}
                onPress={onCopy}>
                <SvgIndex.copy height={40} width={40} />
                <Text>Copy</Text>
              </TouchableOpacity>
              <Button title="Close" onPress={onRevealKey} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Wallet;
