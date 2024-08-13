import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import {Button, CountryNameModal, CustomStatusBar, Header} from '@components';
import styles from './homeScanner.style';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SvgIndex from '@svgIndex';
import color from '@theme/color';
import useHomeScanner from './useHomeScanner';
import imageIndex from '@imageIndex';
import {RNCamera} from 'react-native-camera';

const HomeScanner = () => {
  const {
    onRead,
    scannerData,
    setScannerData,
    getDestinationAddress,
    errorObject,
    onBack,
    sendValidation,
    formatSendPrice,
    onClose,
    readBardCodeGallery,
    handleFlash,
  } = useHomeScanner();

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title={'Scan QR'} />
      <QRCodeScanner
        onRead={(data: any) => {
          onRead(data?.data);
        }}
        vibrate={true}
        showMarker={true}
        flashMode={
          scannerData?.flashMode ? RNCamera.Constants.FlashMode.torch : 'off'
        }
        cameraStyle={styles.qrStyle}
      />
      <View style={styles.bottomStyle}>
        <TouchableOpacity style={styles.galleryContain} onPress={handleFlash}>
          <Image
            source={imageIndex.flash}
            style={[
              styles.galleryIcon,
              {
                tintColor: scannerData?.flashMode ? color.blue : color.black,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.galleryContain}
          onPress={readBardCodeGallery}>
          <Image source={imageIndex.gallerImage} style={styles.galleryIcon} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={scannerData?.visible}
        onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalParent}>
            <TouchableOpacity
              style={styles.closeIcon}
              activeOpacity={0.7}
              onPress={onClose}>
              <SvgIndex.close />
            </TouchableOpacity>
            <View style={styles.amountBook}>
              <SvgIndex.success />
            </View>
            <Text allowFontScaling={false} style={styles.successText}>
              Sending to the following address:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 8,
                paddingHorizontal: 20,
              }}>
              <TextInput
                placeholder={parseFloat(
                  getDestinationAddress()?.amount?.toString() == ''
                    ? '0.0'
                    : getDestinationAddress()?.amount,
                )?.toFixed(2)}
                value={scannerData?.sendAmount}
                style={styles.inputText}
                placeholderTextColor={color.black}
                onChangeText={text => formatSendPrice(text?.trim())}
              />
              {getDestinationAddress()?.assetCode?.toUpperCase() == '' ? (
                <View style={{flex: 1}}>
                  <CountryNameModal
                    placeholder="Currency"
                    leftIcon
                    searchLabel="Select currency"
                    value={scannerData?.currency}
                    isWholeItem
                    setCountryName={(item: any) =>
                      setScannerData('currency', item)
                    }
                    isSelectedItem={(item: any) =>
                      setScannerData('issuer', item)
                    }
                    data={scannerData?.assetList}
                    inputViewContainer={{marginBottom: 0}}
                    container={{
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderColor: color.black,
                      height: 40,
                    }}
                  />
                </View>
              ) : (
                <Text allowFontScaling={false} style={styles.amountText}>
                  {' '}
                  {`${getDestinationAddress()?.assetCode?.toUpperCase()}`}
                </Text>
              )}
            </View>
            {errorObject?.sendAmountError && (
              <Text allowFontScaling={false} style={styles.error}>
                {errorObject?.sendAmountError}
              </Text>
            )}
            <TextInput
              placeholder={'Add Memo'}
              value={scannerData?.memo}
              style={styles.memoText}
              placeholderTextColor={color.black}
              maxLength={25}
              onChangeText={text => setScannerData('memo', text?.trim())}
            />
            {errorObject?.memoError && (
              <Text allowFontScaling={false} style={styles.error}>
                {errorObject?.memoError}
              </Text>
            )}
            {/* <Text allowFontScaling={false} style={styles.amountText}>
              {`${parseFloat(getDestinationAddress()?.amount)?.toFixed(
                2,
              )} ${getDestinationAddress()?.assetCode?.toUpperCase()}`}
            </Text> */}
            <Text allowFontScaling={false} style={styles.infoText}>
              {getDestinationAddress()?.destination}
            </Text>
            {scannerData?.amountError && (
              <View style={styles.warnContent}>
                <SvgIndex.warn />
                <Text style={styles.warnStyle}>{scannerData?.amountError}</Text>
              </View>
            )}
            <Button
              loading={scannerData?.loading}
              title="Send"
              containerStyle={styles.buttonStyle}
              onPress={sendValidation}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScanner;
