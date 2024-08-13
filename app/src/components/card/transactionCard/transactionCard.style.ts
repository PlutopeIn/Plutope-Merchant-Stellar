import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
  },
  defaultImage: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    borderRadius: 25,
    backgroundColor: color.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  xlmImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  buttonStyle: {
    margin: 20,
  },
  imageContent: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: color.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 14,
    color: color.slateBlue,
    fontFamily: font.violetSansRegular,
    flex: 1,
    marginHorizontal: 15,
  },
  amountText: {
    fontSize: 14,
    color: color.slateBlue,
    fontFamily: font.violetSansRegular,
  },
  dateText: {
    fontSize: 12,
    color: color.pencilGray,
    fontFamily: font.interRegular,
    marginTop: 3,
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  dateView: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  codeStyle: {
    fontSize: 16,
    color: color.slateBlue,
    fontFamily: font.violetSansRegular,
    textAlign: 'center',
    marginTop: 15,
  },
  labelStyle: {
    fontSize: 14,
    color: color.slateBlue,
    fontFamily: font.violetSansRegular,
  },
  typeText: {
    fontSize: 14,
    color: color.slateBlue,
    fontFamily: font.violetSansRegular,
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 15,
  },
  timeText: {
    fontSize: 12,
    lineHeight: 16,
    color: color.black,
    fontFamily: font.violetSansRegular,
    marginTop: 4,
  },
  paymentText: {
    marginTop: 10,
    fontSize: 25,
    lineHeight: 28,
    fontFamily: font.violetSansRegular,
    color: color.black,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  symbolText: {
    flex: 1,
    fontSize: 12,
    color: color.pencilGray,
    fontFamily: font.interRegular,
    marginTop: 3,
    marginHorizontal: 15,
  },
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: color.borderGray,
  },
  main: {
    flex: 1,
  },
});

export default styles;
