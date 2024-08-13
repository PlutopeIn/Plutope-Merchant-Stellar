import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 20,
  },
  dateView: {
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginTop: 15,
  },
  timeText: {
    fontSize: 12,
    lineHeight: 16,
    color: color.black,
    fontFamily: font.violetSansRegular,
    marginTop: 4,
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  imageContent: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: color.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  codeStyle: {
    fontSize: 16,
    color: color.slateBlue,
    fontFamily: font.violetSansRegular,
    textAlign: 'center',
    marginTop: 15,
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
  modalContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  cancelImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: color.blueShade,
    fontFamily: font.interRegular,
    paddingRight: 5,
  },
  dateText: {
    fontSize: 16,
    color: color.pencilGray,
    fontFamily: font.interRegular,
    marginTop: 4,
  },
  priceText: {
    fontSize: 26,
    color: color.black,
    fontFamily: font.violetSansRegular,
    marginTop: 4,
  },
  statusText: {
    fontSize: 18,
    fontFamily: font.violetSansRegular,
  },
  labelText: {
    flex: 1,
    fontSize: 18,
    color: color.black,
    fontFamily: font.violetSansRegular,
  },
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: color.borderGray,
    borderRadius: 20,
    marginBottom: 16,
  },
  share: {
    paddingVertical: 10,
  },
  copy: {
    paddingVertical: 10,
    paddingRight: 6,
  },
  linkDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderStyle: {
    borderWidth: 0.4,
    borderColor: color.borderGray,
    marginTop: 15,
  },
  nameDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
});

export default styles;
