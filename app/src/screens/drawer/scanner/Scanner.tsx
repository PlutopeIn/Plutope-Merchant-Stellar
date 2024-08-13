import {
  Modal,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {Button, CustomStatusBar, Header, Input} from '@components';
import styles from './scanner.style';
import QRCodeScanner from 'react-native-qrcode-scanner';
import useScannerController from './useScanner';
import svgIndex from '@svgIndex';
import SvgIndex from '@svgIndex';
import color from '@theme/color';
import imageIndex from '@imageIndex';
import {RNCamera} from 'react-native-camera';

const Scanner = () => {
  const {
    onRead,
    scannerData,
    setScannerData,
    onClickAdd,
    errorObject,
    formatPrice,
    validation,
    onBack,
    route,
    readBardCodeGallery,
    handleFlash,
  } = useScannerController();

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title={`Send ${scannerData?.code}`} />
      {route?.params?.data?.balance == 0 && (
        <View style={styles.warnContent}>
          <SvgIndex.warn />
          <Text style={styles.warnStyle}>Insufficient Balance</Text>
        </View>
      )}
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.labelStyle}>Wallet address</Text>
          <Input
            placeholder="Enter wallet address"
            value={scannerData?.address}
            onChangeText={text => setScannerData('address', text?.trim())}
            mainContainerStyle={styles.inputMainContainer}
            containerStyle={styles.containerStyle}
            inputProps={{maxLength: 255, keyboardType: 'number-pad'}}
            error={errorObject?.addressError}
            rightIcon={svgIndex.scan}
            onRightClick={onClickAdd}
          />
          <Text style={styles.labelStyle}>Amount</Text>
          <Input
            placeholder="Enter amount"
            value={scannerData?.amount}
            onChangeText={text => formatPrice(text?.trim())}
            mainContainerStyle={styles.inputMainContainer}
            containerStyle={styles.containerStyle}
            inputProps={{maxLength: 25, keyboardType: 'number-pad'}}
            error={errorObject?.amountError}
            rightText={scannerData?.code}
          />
          <Text style={styles.labelStyle}>Memo</Text>
          <Input
            placeholder="Memo"
            value={scannerData?.memo}
            onChangeText={text => setScannerData('memo', text?.trim())}
            mainContainerStyle={styles.inputMainContainer}
            containerStyle={styles.containerStyle}
            inputProps={{maxLength: 25}}
            error={errorObject?.memoError}
          />
          {route?.params?.data?.balance != 0 && (
            <Button
              loading={scannerData?.loading}
              title="Send"
              onPress={validation}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        visible={scannerData?.isOpen}
        onRequestClose={() => setScannerData('isOpen', false)}>
        <View style={styles.modalContent}>
          <CustomStatusBar />
          <Header
            title={'Scan QR'}
            onBack={() => setScannerData('isOpen', false)}
          />
          <QRCodeScanner
            onRead={(data: any) => onRead(data?.data)}
            vibrate={true}
            showMarker={true}
            flashMode={
              scannerData?.flashMode
                ? RNCamera.Constants.FlashMode.torch
                : 'off'
            }
            cameraStyle={styles.qrStyle}
          />
          <View style={styles.bottomStyle}>
            <TouchableOpacity
              style={styles.galleryContain}
              onPress={handleFlash}>
              <Image
                source={imageIndex.flash}
                style={[
                  styles.galleryIcon,
                  {
                    tintColor: scannerData?.flashMode
                      ? color.blue
                      : color.black,
                  },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.galleryContain}
              onPress={readBardCodeGallery}>
              <Image
                source={imageIndex.gallerImage}
                style={styles.galleryIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Scanner;
