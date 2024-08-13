import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import changePasswordController from './useChangePassword';
import {Button, CustomStatusBar, Header, Input} from '@components';
import styles from './changePassword.style';
import SvgIndex from '@svgIndex';

const ChangePassword = () => {
  const {userInput, setUserInput, errorObject, validation} =
    changePasswordController();
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header title="Change Password" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Text allowFontScaling={false} style={styles.codeSendText}>
            Your new newPassword must be different from previously used
            passwords
          </Text>
          <Input
            placeholder="Old Password"
            leftIcon={() => <SvgIndex.lock />}
            mainContainerStyle={styles.inputMainContainer}
            inputProps={{maxLength: 25}}
            hideText
            secureText
            value={userInput?.oldPassword}
            onChangeText={(text: string) =>
              setUserInput('oldPassword', text?.trimStart())
            }
            error={errorObject?.oldPasswordError}
          />
          <Input
            placeholder="New Password"
            leftIcon={() => <SvgIndex.lock />}
            inputProps={{maxLength: 25}}
            hideText
            secureText
            value={userInput?.newPassword}
            onChangeText={(text: string) =>
              setUserInput('newPassword', text?.trimStart())
            }
            error={errorObject?.newPasswordError}
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

export default ChangePassword;
