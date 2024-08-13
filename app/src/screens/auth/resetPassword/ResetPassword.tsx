import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Button, CustomStatusBar, Header, Input} from '@components';
import styles from './resetPassword.style';
import useResetPassword from './useResetPassword';
import SvgIndex from '@svgIndex';

const ResetPassword = () => {
  const {userInput, setUserInput, errorObject, validation} = useResetPassword();
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
            Create New Password?
          </Text>
          <Text allowFontScaling={false} style={styles.codeSendText}>
            Your new password must be different from previously used passwords
          </Text>
          <Input
            placeholder="Password"
            leftIcon={() => <SvgIndex.lock />}
            mainContainerStyle={styles.inputMainContainer}
            inputProps={{maxLength: 25}}
            hideText
            secureText
            value={userInput?.password}
            onChangeText={(text: string) =>
              setUserInput('password', text?.trimStart())
            }
            error={errorObject?.passwordError}
          />
          <Input
            placeholder="Confirm New Password"
            leftIcon={() => <SvgIndex.lock />}
            inputProps={{maxLength: 25}}
            hideText
            secureText
            value={userInput?.confirmPassword}
            onChangeText={(text: string) =>
              setUserInput('confirmPassword', text?.trimStart())
            }
            error={errorObject?.confirmPasswordError}
          />
          <Button
            loading={userInput?.loading}
            title="Submit"
            containerStyle={styles.button}
            onPress={validation}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPassword;
