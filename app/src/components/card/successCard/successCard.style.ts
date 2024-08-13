import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  labelTextView: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 21,
    paddingVertical: 7,
    backgroundColor: color.inputBorder,
    marginRight: 8,
    borderRadius: 9,
  },
  labelTextStyle: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.interRegular,
  },
  chainSuccess: {
    fontSize: 18,
    lineHeight: 22,
    color: color.primary,
    fontFamily: font.interRegular,
    textAlign: 'center',
    marginTop: 20,
  },
  walletImage: {
    height: 350,
    width: 350,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  walletContainer: {
    borderWidth: 1,
    borderColor: color.inputBorder,
    borderRadius: 15,
    padding: 8,
    alignSelf: 'center',
    backgroundColor: color.gray97,
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletText: {
    fontSize: 16,
    color: color.black,
    lineHeight: 20,
    fontFamily: font.interRegular,
    marginHorizontal: 10,
  },
  arrowImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
});

export default styles;
