import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Button, CustomStatusBar, Header, Input} from '@components';
import styles from './forgotPassword.style';
import useForgotPassword from './useForgotPassword';
import SvgIndex from '@svgIndex';
import color from '@theme/color';

const ForgotPassword = () => {
  const {userInput, setUserInput, errorObject, validation} =
    useForgotPassword();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Text allowFontScaling={false} style={styles.otpVerifyScreen}>
            Forgot Password?
          </Text>
          <Text allowFontScaling={false} style={styles.codeSendText}>
            Don’t warry! it happens. Please enter the address associated with
            your account
          </Text>
          <Input
            placeholder="Email"
            leftIcon={() => (
              <SvgIndex.sms stroke={color.black} fill={color.black} />
            )}
            mainContainerStyle={styles.inputMainContainer}
            inputProps={{
              keyboardType: 'email-address',
              maxLength: 255,
            }}
            value={userInput?.email}
            onChangeText={(text: string) =>
              setUserInput('email', text?.toLowerCase()?.trim())
            }
            error={errorObject?.emailError}
          />
          <Button
            loading={userInput?.loading}
            title="Send Me Email"
            containerStyle={styles.button}
            onPress={validation}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;
