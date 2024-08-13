import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const style = StyleSheet.create({
  container: {
    height: 54,
    borderRadius: 50,
    backgroundColor: color.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: color.white,
    fontFamily: font.violetSansRegular,
  },
});

export default style;
