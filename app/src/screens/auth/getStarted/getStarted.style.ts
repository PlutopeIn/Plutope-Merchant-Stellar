import color from '@theme/color';
import font from '@theme/font';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  introSlide: {
    height: '100%',
    width: width,
  },
  introTitle: {
    color: color.black,
    fontSize: 32,
    lineHeight: 44,
    fontFamily: font.violetSansRegular,
    marginHorizontal: 15,
  },
  introDescription: {
    color: color.blackTransparent,
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
    fontFamily: font.interRegular,
    marginHorizontal: 16,
  },
  skipText: {
    fontFamily: font.violetSansRegular,
    color: color.greyTransparent,
    fontSize: 16,
  },
  skipTextContainer: {
    position: 'absolute',
    marginTop: 15,
    right: 0,
  },
  buttonContainer: {
    height: 60,
    width: 60,
    backgroundColor: color.black,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    bottom: 34,
    alignSelf: 'flex-end',
  },
  buttonTextContainer: {
    width: '100%',
  },
  getStartedButtonContainer: {
    height: 60,
    width: '100%',
  },
  introContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'flex-end',
    height: 96,
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems : "center"
  },
  introImage: {
    width: width,
    height: height / 2.4,
  },
  skipContainer: {
    height: 31,
    width: 71,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
  },
  scrollViewStyle: {
    flex: 1,
  },
  haveAccountText: {
    fontSize: 14,
    color: color.gray58,
    fontFamily: font.interRegular,
    textAlign: 'center',
    lineHeight: 34,
  },
  signinText: {
    fontSize: 14,
    color: color.blueShade,
    fontFamily: font.interRegular,
  },
  imageStyle: {width: 350, height: 350},
});

export default styles;
