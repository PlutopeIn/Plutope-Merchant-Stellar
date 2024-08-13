import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import otpVerificationController from './useVerifyOtp';
import style from './verifyOtp.style';
import color from '@theme/color';
import {Button, CustomStatusBar, Header} from '@components';
import {TimerCountdown} from '@utility/validation/commonFunction';

const VerifyOtp: React.FC = () => {
  const {
    validationVerifyOtp,
    onResendOtpCall,
    verifyOTP,
    scrollViewRef,
    refOtp,
    setVerifyOTP,
    errorObject,
    timer,
    route,
  } = otpVerificationController();

  return (
    <View style={style.container}>
      <CustomStatusBar />
      <Header />
      <KeyboardAvoidingView
        style={style.keyboardContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollViewRef}
          overScrollMode="never"
          bounces={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          contentContainerStyle={style.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Text allowFontScaling={false} style={style.otpVerifyScreen}>
            Verify Your Email
          </Text>
          <Text allowFontScaling={false} style={style.codeSendText}>
            Enter the OTP send to{' '}
            <Text allowFontScaling={false} style={style.emailSendText}>
              {route?.params?.email}
            </Text>
          </Text>
          <View style={style.mainContainer}>
            <CodeField
              ref={refOtp}
              value={verifyOTP?.otpCode}
              onChangeText={(text: string) =>
                setVerifyOTP('otpCode', text?.replace(/[^0-9]/g, ''))
              }
              cellCount={4}
              rootStyle={style.otpInputContainer}
              keyboardType="numeric"
              textContentType="oneTimeCode"
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={[
                    style.otpView,
                    {
                      borderColor:
                        isFocused || symbol ? color.black : color.inputBorder,
                    },
                  ]}>
                  <Text
                    allowFontScaling={false}
                    key={index}
                    style={[style.cell, isFocused && style.focusCell]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            <Text style={style.errorText}>{errorObject.mobileOtpError}</Text>
            {timer != 0 ? (
              <View>
                <Text style={style.resendCodeText}>
                  Resend OTP in {TimerCountdown(timer)}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={style.resendView}
                onPress={onResendOtpCall}>
                <Text style={style.noReceiveText}>
                  I didn’t receive the code
                </Text>
                <Text allowFontScaling={false} style={style.resendOtpText}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Button
        loading={verifyOTP?.loading}
        title={'Verify'}
        onPress={validationVerifyOtp}
        containerStyle={style.buttonContainer}
      />
    </View>
  );
};

export default VerifyOtp;
