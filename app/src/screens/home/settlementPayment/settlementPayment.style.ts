import color from '@theme/color';
import font from '@theme/font';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    marginHorizontal: 18,
  },
  labelText: {
    fontSize: 16,
    color: color.black,
    marginTop: 30,
    fontFamily: font.interRegular,
    lineHeight: 20,
  },
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    marginTop: 30,
    flex: 1,
  },
  availableContainer: {
    borderWidth: 1,
    borderColor: color.disabled,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  bookImage: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  availableText: {
    fontSize: 18,
    lineHeight: 22,
    color: color.granite,
    fontFamily: font.violetSansRegular,
  },
  priceText: {
    fontSize: 20,
    lineHeight: 24,
    color: color.black,
    fontFamily: font.violetSansRegular,
  },
  withdrawButtonContainer: {
    marginTop: 20,
    backgroundColor: undefined,
    borderWidth: 1,
  },
  withdrawButtonText: {
    color: color.black,
  },
  fontsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderColor: color.disabled,
    height: 45,
  },
  fontsText: {
    fontSize: 16,
    color: color.black,
    lineHeight: 20,
    fontFamily: font.interRegular,
    flex: 1,
    paddingVertical: 10,
  },
  arrowImage: {
    height: 20,
    width: 20,
    transform: [{rotate: '90deg'}],
  },
  bankDetails: {
    fontSize: 24,
    color: color.blackTransparent,
    textAlign: 'center',
  },
  bankNameText: {
    color: color.black,
  },
  bankNameContainer: {
    marginTop: 20,
  },
});

export default styles;
