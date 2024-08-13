import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
  },
  otpVerifyScreen: {
    fontFamily: font.violetSansRegular,
    fontSize: 30,
    lineHeight: 30,
    color: color.black,
    marginTop: 24,
  },
  codeSendText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: font.interRegular,
    color: color.black,
    marginTop: 20,
  },
  inputMainContainer: {
    marginTop: 60,
  },
  button: {
    marginTop: 15,
  },
});

export default styles;
