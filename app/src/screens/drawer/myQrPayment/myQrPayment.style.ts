import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  logoParent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
  },
  amountIcon: {
    marginLeft: 20,
  },
  merchantName: {
    fontSize: 32,
    color: color.black,
    fontFamily: font.violetSansRegular,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  iconDivider: {
    flexDirection: 'row',
    marginTop: 50,
    alignSelf: 'center',
  },
  addressText: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: color.black,
    fontFamily: font.interRegular,
    marginTop: 15,
    marginHorizontal: 20,
    backgroundColor: color.borderGray,
    borderRadius: 50,
    textAlign: 'center',
  },
  qrCode: {
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontSize: 32,
    color: color.black,
    fontFamily: font.violetSansRegular,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 45,
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  containerStyle: {
    borderRadius: 20,
  },
  mainContainerStyle: {
    marginHorizontal: 20,
  },
  paymentText: {
    marginTop: 10,
    fontSize: 25,
    fontFamily: font.violetSansRegular,
    color: color.black,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  successText: {
    marginTop: 10,
    fontSize: 25,
    fontFamily: font.violetSansRegular,
    color: color.black,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: font.interRegular,
    color: color.black,
    textAlign: 'center',
    paddingHorizontal: 25,
    lineHeight: 24,
    marginBottom: 24,
  },
  amountBook: {
    alignSelf: 'center',
  },
  closeIcon: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  modalParent: {
    backgroundColor: color.white,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: color.blackTransparent,
    justifyContent: 'center',
  },
});

export default styles;
