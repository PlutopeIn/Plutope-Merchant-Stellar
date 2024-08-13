import {color, font} from '@theme/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  copyBtn: {
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  warnDesc: {
    fontFamily: font.interRegular,
    fontSize: 14,
    color: color.black,
    marginTop: 6,
  },
  warnLabel: {
    fontFamily: font.interRegular,
    fontSize: 16,
    color: color.black,
  },
  warnContent: {
    flex: 1,
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  warningMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    backgroundColor: color.borderGray,
    marginTop: 25,
    borderRadius: 10,
  },
  description: {
    fontFamily: font.interLight,
    fontSize: 16,
    color: color.gray33,
    marginTop: 15,
  },
  keepLabel: {
    fontFamily: font.interRegular,
    fontSize: 20,
    color: color.black,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: color.white,
    minHeight: 382,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.blackTransparent,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 35,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  content: {
    flexGrow: 1,
    marginHorizontal: 20,
  },
  labelContainer: {
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: color.white,
    padding: 8,
    marginHorizontal: 2,
    borderRadius: 8,
    marginTop: 18,
  },
  labelText: {
    fontSize: 15,
    color: color.black,
    fontFamily: font.violetSansRegular,
    flex: 1,
  },
  secretText: {
    fontSize: 11,
    fontFamily: font.interRegular,
    color: color.black,
    lineHeight: 20,
  },
});

export default styles;
