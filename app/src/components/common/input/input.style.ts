import {Platform, StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const style = StyleSheet.create({
  mainContainer: {
    marginBottom: 16,
  },
  container: {
    height: 54,
    borderRadius: 27,
    borderColor: color.inputBorder,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  leftIconStyle: {
    marginRight: 15,
  },
  input: {
    height: Platform.OS === 'android' ? 54 : undefined,
    flex: 1,
    borderRadius: 27,
    fontSize: 16,
    color: color.black,
    fontFamily: font.interRegular,
    zIndex: 1,
    paddingVertical: 0,
  },
  imageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 12,
    paddingVertical: 8,
  },
  rightIcon: {
    // justifyContent: 'center',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 20,
    paddingLeft: 10,
  },
  rightText: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.violetSansRegular,
  },
  error: {
    fontSize: 12,
    color: color.red,
    fontFamily: font.interRegular,
    marginLeft: 10,
    marginTop: 5,
  },
});

export default style;
