import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ReactNativePinView from 'react-native-pin-view';
import useBiometricPassword from './useBiometricPassword';
import styles from './biometricPassword.style';
import {CustomStatusBar} from '@components';
import SvgIndex from '@svgIndex';
import color from '@theme/color';
const BiometricPassword: React.FC = () => {
  const {pinView, setPin, passcodeError, checkAvailable, user, onButtonPress} =
    useBiometricPassword();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}>
        <Text allowFontScaling={false} style={styles.labelText}>
          {user?.passcode ? 'Enter Passcode' : 'Create Passcode'}
        </Text>
        <Text allowFontScaling={false} style={styles.infoText}>
          Add an extra layer of security when using the app
        </Text>
        <View style={styles.buttonContent}>
          <ReactNativePinView
            inputSize={15}
            pinLength={6}
            buttonSize={60}
            ref={pinView}
            passwordComponent={true}
            onButtonPress={onButtonPress}
            onValueChange={value => setPin(value)}
            inputViewEmptyStyle={styles.inputViewEmptyStyle}
            buttonTextStyle={styles.buttonTextStyle}
            //@ts-ignore
            customLeftButton={
              checkAvailable ? (
                <SvgIndex.fingerPrint />
              ) : (
                <Text allowFontScaling={false} style={styles.cancelPinText}>
                  Cancel
                </Text>
              )
            }
            //@ts-ignore
            customRightButton={
              <View style={styles.imageStyle}>
                <SvgIndex.eraser style={styles.iconView} fill={color.white} />
              </View>
            }
          />
        </View>
        {passcodeError && (
          <Text allowFontScaling={false} style={styles.errorText}>
            {passcodeError}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default BiometricPassword;
