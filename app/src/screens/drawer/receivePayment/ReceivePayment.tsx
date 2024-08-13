import {View, Text, TouchableOpacity, Modal, ScrollView} from 'react-native';
import React from 'react';
import {
  Button,
  CountryNameModal,
  CustomStatusBar,
  Header,
  Input,
  QRCode,
} from '@components';
import styles from './receivePayment.style';
import SvgIndex from '@svgIndex';
import useReceivePaymentController from './useReceivePayment';
import imageIndex from '@imageIndex';
import Log from '@utility/log';

const ReceivePayment = () => {
  const {
    validation,
    walletPrivateData,
    onClickCopy,
    onClickShare,
    qrcodeDetail,
    setQrcodeDetail,
    onClickClose,
    onClickAmount,
    formatPrice,
    info,
    userDetails,
  } = useReceivePaymentController();
  Log('userDetails', userDetails);
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
          {qrcodeDetail?.finalAmount && (
            <Text allowFontScaling={false} style={styles.priceText}>
              {qrcodeDetail?.finalAmount} {qrcodeDetail?.currency}
            </Text>
          )}
          {qrcodeDetail?.qrCodeData ? (
            <QRCode
              url={qrcodeDetail?.qrCodeData}
              size={200}
              logo={imageIndex.plutopeIcon}
              backgroundColor="white"
              logoBackgroundColor="transparent"
            />
          ) : (
            <Text>Generating QR Code...</Text>
          )}
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
              onPress={onClickAmount}>
              <SvgIndex.amount />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={onClickShare}>
              <SvgIndex.share />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        visible={qrcodeDetail?.visible}
        transparent
        onRequestClose={onClickClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalParent}>
            <TouchableOpacity
              style={styles.closeIcon}
              activeOpacity={0.7}
              onPress={onClickClose}>
              <SvgIndex.close />
            </TouchableOpacity>
            <View style={styles.amountBook}>
              <SvgIndex.amountBook />
            </View>
            <Text allowFontScaling={false} style={styles.paymentText}>
              {info?.screen == 'receiveAsset'
                ? 'How much amount do you want to receive ?'
                : 'How much amount do you want to receive ?'}
            </Text>
            <Input
              value={qrcodeDetail?.amount}
              placeholder="Enter Amount"
              mainContainerStyle={styles.mainContainerStyle}
              containerStyle={styles.containerStyle}
              onChangeText={text => formatPrice(text?.trim())}
              inputProps={{maxLength: 25, keyboardType: 'number-pad'}}
              error={qrcodeDetail?.amountError}
            />
            {info?.screen != 'receiveAsset' && (
              <CountryNameModal
                placeholder="Select currency"
                leftIcon
                searchLabel="Select currency"
                value={qrcodeDetail?.currency}
                isWholeItem
                setCountryName={(item: any) =>
                  setQrcodeDetail('currency', item)
                }
                isSelectedItem={(item: any) => setQrcodeDetail('issuer', item)}
                data={qrcodeDetail?.assetList}
                inputViewContainer={{marginHorizontal: 20}}
                error={qrcodeDetail?.currencyError}
              />
            )}
            <Button
              title="Set Amount"
              containerStyle={styles.buttonStyle}
              onPress={validation}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={qrcodeDetail?.success}
        transparent
        onRequestClose={() => setQrcodeDetail('success', false)}>
        <View style={styles.modalContainer}>
          <CustomStatusBar />
          <View style={styles.modalParent}>
            <TouchableOpacity
              style={styles.closeIcon}
              activeOpacity={0.7}
              onPress={() => setQrcodeDetail('success', false)}>
              <SvgIndex.close />
            </TouchableOpacity>
            <View style={styles.amountBook}>
              <SvgIndex.success />
            </View>
            <Text allowFontScaling={false} style={styles.successText}>
              Amount Received
            </Text>
            <Text allowFontScaling={false} style={styles.infoText}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form...
            </Text>
            <Button
              title="Back"
              containerStyle={styles.buttonStyle}
              onPress={() => setQrcodeDetail('success', false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReceivePayment;
