import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const styles = StyleSheet.create({
  container: {
    width: '40%',
    marginHorizontal: 20,
  },
  parentView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: color.inputBorder,
  },
  numberText: {
    fontSize: 14,
    color: color.blueShade,
    fontFamily: font.interRegular,
    marginRight: 9,
  },
  labelText: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.interRegular,
  },
});
export default styles;
