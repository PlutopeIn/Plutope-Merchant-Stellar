import color from '@theme/color';
import font from '@theme/font';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textInputStyle: {
    flex: 1,
    color: color.black,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: font.interRegular,
    height: 54,
    borderRadius: 30,
    marginLeft: 10,
    alignSelf: 'center',
  },
  dropText: {
    color: color.black,
    fontSize: 16,
    fontFamily: font.interRegular,
    marginRight: 8,
  },
  arrowImage: {
    height: 15,
    width: 15,
    transform: [{rotate: '180deg'}],
    marginLeft: 5,
    resizeMode: 'contain',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 15,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    alignSelf: 'center',
    borderRightWidth: 1,
    borderColor: color.inputBorder,
  },
  modelCloseButton: {
    padding: 10,
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  dropDownRow: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: color.blackTransparent,
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.interRegular,
    paddingHorizontal: 12,
  },
  gradientView: {
    height: 54,
    borderRadius: 30,
    padding: 1,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: color.blue,
  },
  textInput: {
    color: color.black,
    fontSize: 16,
    fontFamily: font.interRegular,
    flex: 1,
    height: 54,
    borderRadius: 50,
    marginLeft: 5,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.inputBorder,
    borderRadius: 50,
    height: 54,
    paddingRight: 24,
  },
  inputViewContainer: {
    flex: 1,
    borderRadius: 50,
    marginBottom: 16,
  },
  searchInputView: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: font.interRegular,
    marginLeft: 16,
    color: color.red,
  },
});

export default styles;
