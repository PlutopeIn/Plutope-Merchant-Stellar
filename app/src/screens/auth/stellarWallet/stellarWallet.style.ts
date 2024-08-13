import color from '@theme/color';
import font from '@theme/font';
import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  walletImage: {
    height: height / 2.2,
    width: width,
    resizeMode: 'contain',
    marginTop: 20,
  },
  subContainer: {
    marginHorizontal: 16,
    flex: 1,
  },
  stellarText: {
    fontSize: 32,
    lineHeight: 44,
    color: color.black,
    fontFamily: font.violetSansRegular,
  },
  detailsText: {
    fontSize: 16,
    lineHeight: 24,
    color: color.blackTransparent,
    fontFamily: font.interRegular,
    marginTop: 15,
  },
  buttonContainer: {
    marginHorizontal: 16,
  },
  connectContainer: {
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 16,
    backgroundColor: color.borderGray,
  },
  connectText: {
    color: color.black,
  },
});

export default styles;
