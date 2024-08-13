import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 50,
    paddingHorizontal: 36,
  },
  labelText: {
    fontSize: 27,
    color: color.black,
    fontFamily: font.interRegular,
    marginTop: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 13,
    color: color.primary,
    fontFamily: font.interRegular,
    lineHeight: 25,
    marginTop: 18,
    marginBottom: 30,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  inputViewEmptyStyle: {
    backgroundColor: color.gray58,
  },
  buttonTextStyle: {
    color: color.black,
    fontSize: 27,
    fontFamily: font.interRegular,
  },
  cancelPinText: {
    color: color.black,
  },
  inputViewFilledStyle: {
    color: color.primary,
  },
  buttonText: {
    fontSize: 27,
    fontFamily: font.interRegular,
  },
  cancelText: {
    fontSize: 15,
    color: color.primary,
    fontFamily: font.interRegular,
  },
  errorText: {
    fontSize: 12,
    color: color.red,
    fontFamily: font.interRegular,
    textAlign: 'center',
    marginHorizontal: 17,
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primaryGrey,
  },
  iconView: {
    left: -2,
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default styles;
