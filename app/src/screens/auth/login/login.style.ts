import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 35,
  },
  keyboardContainer: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 14,
    marginTop: 50,
  },
  detailsText: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.interRegular,
    lineHeight: 24,
    marginTop: 15,
  },
  stellar: {
    fontSize: 32,
    color: color.primary,
    fontFamily: font.violetSansRegular,
    lineHeight: 44,
    marginTop: 10,
  },
  inputMainContainer: {
    marginTop: 40,
  },
  button: {
    marginHorizontal: 16,
  },
  haveAccountText: {
    fontSize: 14,
    color: color.gray58,
    fontFamily: font.interRegular,
    textAlign: 'center',
    marginTop: 30,
    paddingVertical: 4,
  },
  signinText: {
    fontSize: 14,
    color: color.blueShade,
    fontFamily: font.interRegular,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: font.interRegular,
    color: color.blueShade,
    padding: 4,
  },
});

export default style;
