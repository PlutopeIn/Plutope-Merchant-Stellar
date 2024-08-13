import {font, color} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bottomStyle: {
    height: 50,
    backgroundColor: color.white,
    position: 'absolute',
    bottom: 30,
    right: 20,
    left: 20,
    flexDirection: 'row',
    borderRadius: 10,
  },
  galleryContain: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  galleryIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  rightIcon: {
    paddingRight: 10,
  },
  qrStyle: {
    height: '100%',
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
  successText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: font.violetSansRegular,
    color: color.black,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  amountText: {
    fontSize: 24,
    fontFamily: font.interRegular,
    color: color.black,
    flex: 1,
  },
  inputText: {
    fontSize: 24,
    fontFamily: font.interRegular,
    color: color.black,
    textAlign: 'right',
    padding: 0,
    paddingHorizontal: 8,
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 40 / 2,
    borderColor: color.gray58,
  },
  warnContent: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warnStyle: {
    fontSize: 16,
    color: color.red,
    fontFamily: font.violetSansRegular,
    marginLeft: 8,
  },
  memoText: {
    fontSize: 12,
    fontFamily: font.interRegular,
    color: color.black,
    textAlign: 'center',
    padding: 0,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: color.black,
    marginHorizontal: 20,
    marginTop: 20,
  },
  infoText: {
    marginTop: 12,
    fontSize: 14,
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
  buttonStyle: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    backgroundColor: color.white,
  },
  keyboardContainer: {
    flex: 1,
  },
  error: {
    fontSize: 12,
    color: color.red,
    fontFamily: font.interRegular,
    marginLeft: 20,
    marginTop: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
    marginTop: 20,
    paddingBottom: 20,
  },
  labelStyle: {
    fontSize: 13,
    color: color.black,
    fontFamily: font.violetSansRegular,
  },
  containerStyle: {
    paddingHorizontal: 20,
  },
  inputMainContainer: {
    marginTop: 8,
  },
});

export default styles;
