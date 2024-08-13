import color from '@theme/color';
import font from '@theme/font';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  otpVerificationImage: {
    marginTop: 134,
    alignSelf: 'center',
    height: 207,
    width: 207,
  },
  otpVerifyScreen: {
    fontFamily: font.violetSansRegular,
    fontSize: 30,
    lineHeight: 30,
    color: color.black,
    marginTop: 24,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
  },
  codeSendText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: font.interRegular,
    color: color.black,
    marginTop: 20,
  },
  emailSendText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: font.violetSansRegular,
    color: color.blueShade,
    marginTop: 20,
  },
  emailText: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: font.interRegular,
    color: color.blue,
    textAlign: 'center',
  },
  mainContainer: {
    marginTop: 35,
    marginHorizontal: 15,
  },
  otpInputContainer: {
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 22,
    color: color.blue,
    fontFamily: font.interRegular,
  },
  otpView: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.inputBorder,
  },
  cell: {
    fontSize: 25,
    color: color.black,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: color.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 40,
  },
  noReceiveText: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.interRegular,
    textAlign: 'center',
    marginTop: 30,
  },
  resendCodeText: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.interRegular,
    textAlign: 'center',
    marginTop: 5,
  },
  resendOtpText: {
    fontSize: 14,
    color: color.blue,
    fontFamily: font.interRegular,
    textAlign: 'center',
    marginTop: 8,
  },
  resendView: {
    marginTop: 18,
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: font.interRegular,
    color: color.red,
  },
});
export default style;
