import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {CustomStatusBar, Header, QRCode} from '@components';
import styles from './myQrPayment.style';
import SvgIndex from '@svgIndex';
import useMyQrPaymentController from './useMyQrPayment';
import imageIndex from '@imageIndex';

const MyQrPayment = () => {
  const {onClickShare, onClickCopy, walletPrivateData, userDetails} =
    useMyQrPaymentController();

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="QR Code Payment" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoParent}>
          <Text allowFontScaling={false} style={styles.merchantName}>
            {`${userDetails?.getKycDetails?.firstName} ${userDetails?.getKycDetails?.lastName}`}
          </Text>
          <QRCode
            url={`${walletPrivateData?.publicKey}`}
            size={200}
            logo={imageIndex.plutopeIcon}
            backgroundColor="white"
            logoBackgroundColor="transparent"
          />
        </View>
        <View style={styles.main}>
          <Text
            allowFontScaling={false}
            style={styles.addressText}
            numberOfLines={1}>
            {walletPrivateData?.publicKey}
          </Text>
          <View style={styles.iconDivider}>
            <TouchableOpacity activeOpacity={0.6} onPress={onClickCopy}>
              <SvgIndex.copy />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.amountIcon}
              onPress={onClickShare}>
              <SvgIndex.share />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyQrPayment;
