import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {CustomStatusBar, Button, Input, Header} from '@components';
import useLogin from './useLogin';
import style from './login.style';
import SvgIndex from '@svgIndex';
import color from '@theme/color';

const Login: React.FC = () => {
  const {
    validation,
    errorObject,
    onSignupClick,
    userLogin,
    setUserLogin,
    onForgotPassword,
  } = useLogin();
  return (
    <View style={style.container}>
      <CustomStatusBar />
      <Header />
      <KeyboardAvoidingView
        style={style.keyboardContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={style.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          overScrollMode="never"
          bounces={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}>
          <View style={style.detailsContainer}>
            <Text allowFontScaling={false} style={style.stellar}>
              Welcome back!
            </Text>
            <Text allowFontScaling={false} style={style.detailsText}>
              Sign up and be part of the Crypto Freedom
            </Text>
            <Input
              placeholder="Email"
              value={userLogin?.email}
              leftIcon={() => (
                <SvgIndex.sms stroke={color.black} fill={color.black} />
              )}
              onChangeText={text =>
                setUserLogin('email', text.trim())
              }
              mainContainerStyle={style.inputMainContainer}
              inputProps={{
                keyboardType: 'email-address',
                maxLength: 255,
              }}
              error={errorObject?.emailError}
            />
            <Input
              placeholder="Password"
              value={userLogin?.password}
              leftIcon={() => <SvgIndex.lock />}
              onChangeText={text => setUserLogin('password', text?.trimEnd())}
              hideText={true}
              secureText={true}
              inputProps={{maxLength: 25}}
              error={errorObject?.passwordError}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={style.forgotPasswordContainer}
              onPress={onForgotPassword}>
              <Text allowFontScaling={false} style={style.forgotPasswordText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <Text allowFontScaling={false} style={style.haveAccountText}>
              Don't have an account?{' '}
              <Text
                allowFontScaling={false}
                style={style.signinText}
                onPress={onSignupClick}
                suppressHighlighting={true}>
                Sign up
              </Text>
            </Text>
          </View>
          <Button
            loading={userLogin?.loading}
            title="Login"
            containerStyle={style.button}
            onPress={validation}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
