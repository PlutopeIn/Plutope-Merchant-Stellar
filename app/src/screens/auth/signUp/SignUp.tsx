import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import useSignUp from './useSignUp';
import style from './signUp.style';
import {
  Button,
  CountryCodeModal,
  CustomStatusBar,
  Header,
  Input,
} from '@components';
import svgIndex from '@svgIndex';
import color from '@theme/color';

const SignUp: React.FC = () => {
  const {
    validation,
    errorObject,
    userSignUp,
    setUserSignUp,
    onSelectCountryCode,
    onHandleClick,
  } = useSignUp();
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
          overScrollMode="never"
          bounces={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled">
          <View style={style.detailsContainer}>
            <Text allowFontScaling={false} style={style.stellar}>
              Let’s Create Your Account!
            </Text>
            <Text allowFontScaling={false} style={style.detailsText}>
              Sign up and be part of the Crypto Freedom
            </Text>
            <View style={style.keyboardContainer}>
              <Input
                placeholder="Email"
                value={userSignUp?.email}
                leftIcon={() => (
                  <svgIndex.sms stroke={color.black} fill={color.black} />
                )}
                onChangeText={text =>
                  setUserSignUp('email', text?.toLowerCase()?.trim())
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
                value={userSignUp?.password}
                leftIcon={() => <svgIndex.lock />}
                onChangeText={text => setUserSignUp('password', text?.trim())}
                hideText={true}
                secureText={true}
                inputProps={{maxLength: 25}}
                error={errorObject?.passwordError}
              />
              <Input
                placeholder="Confirm Password"
                value={userSignUp?.confirmPassword}
                leftIcon={() => <svgIndex.lock />}
                onChangeText={text =>
                  setUserSignUp('confirmPassword', text?.trim())
                }
                hideText={true}
                secureText={true}
                inputProps={{maxLength: 25}}
                error={errorObject?.confirmPasswordError}
              />
              <Text allowFontScaling={false} style={style.infoText}>
                By Signing in you are agreeing to our{' '}
                <Text
                  allowFontScaling={false}
                  style={style.highlightText}
                  onPress={() => onHandleClick(1)}>
                  Terms of Conditions
                </Text>{' '}
                and{' '}
                <Text
                  allowFontScaling={false}
                  style={style.highlightText}
                  onPress={() => onHandleClick(2)}>
                  Privacy Policy
                </Text>
                .
              </Text>
              {/* <CountryCodeModal
                selectedCountry={userSignUp?.selectCountryCode}
                setSelectedCountry={onSelectCountryCode}
                placeholder="Mobile Number"
                inputValue={userSignUp?.mobileNumber}
                setValue={(text: string) =>
                  setUserSignUp(
                    'mobileNumber',
                    text?.trim()?.replace(/[^0-9]/g, ''),
                  )
                }
                maxLength={userSignUp?.mobileLength}
                keyboardType={'numeric'}
                error={errorObject?.mobileError}
              /> */}
            </View>
            <Button
              loading={userSignUp?.loading}
              title="Continue"
              containerStyle={style.button}
              onPress={validation}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;
