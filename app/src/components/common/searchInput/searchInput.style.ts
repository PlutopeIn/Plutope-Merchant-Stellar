import color from '@theme/color';
import font from '@theme/font';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: color.lightGray,
    backgroundColor: color.whiteSmoke,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: color.black,
    fontFamily: font.interRegular,
    lineHeight: 18,
    height: 54,
  },
  closeIcon: {
    right: 50,
  },
  searchView: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

export default style;
