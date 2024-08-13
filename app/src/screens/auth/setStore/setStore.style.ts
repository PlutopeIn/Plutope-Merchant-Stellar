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
  },
  keyboardContainer: {
    flex: 1,
  },
  dropdown: {
    zIndex: 999,
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  cityContainer: {
    width: '48%',
    marginRight: 5,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 15,
    marginBottom: 40,
  },
  safeAreaView: {
    flex: 1,
  },
  modelCloseButton: {
    padding: 15,
    marginLeft: 20,
    alignSelf: 'flex-end',
  },
  searchInputView: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    color: color.black,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: font.interRegular,
  },
  dropDownRow: {
    paddingVertical: 15,
    marginHorizontal: 10,
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
  touchableContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    borderColor: color.inputBorder,
    borderWidth: 1,
    paddingHorizontal: 20,
    backgroundColor: color.white,
    marginBottom: 16,
  },
  leftStyle: {
    height: 22,
    width: 22,
    marginRight: 20,
  },
  titleTextStyle: {
    fontSize: 14,
    color: color.inputText,
    fontFamily: font.interRegular,
    flex: 1,
  },
  arrowStyle: {
    height: 15,
    width: 15,
  },
});

export default styles;
