import {StyleSheet} from 'react-native';
import {color, font} from '@theme/index';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  infoText: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.violetSansRegular,
    lineHeight: 22,
    textAlign: 'left',
  },
});

export default style;
